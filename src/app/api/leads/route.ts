import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

const WEBHOOK_RESPONSE_TIMEOUT = 2500; // 2.5 seconds timeout for client response
const WEBHOOK_MAX_DURATION = 10000;    // 10 seconds hard timeout for webhook execution

export async function POST(request: Request) {
  const requestId = randomUUID();
  const startTime = Date.now();
  let data: any;

  try {
    data = await request.json();
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error(JSON.stringify({
      requestId,
      event: 'lead_submission_error',
      error: 'N8N_WEBHOOK_URL is not defined',
    }));
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }

  // TODO: In the future, replace this with a durable queue (e.g. Redis/BullMQ)
  // to ensure 100% reliability for lead processing and retries.
  // Current implementation uses a fire-and-forget pattern with a safety timeout.

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_MAX_DURATION);

  const webhookPromise = fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      metadata: {
        requestId,
        timestamp: new Date().toISOString(),
      }
    }),
    signal: controller.signal,
  })
  .then(async (res) => {
    clearTimeout(timeoutId);
    if (!res.ok) {
      const errorText = await res.text().catch(() => 'Unknown error');
      throw new Error(`N8N responded with ${res.status}: ${errorText}`);
    }

    // Log success in background (fire-and-forget success)
    console.log(JSON.stringify({
      requestId,
      event: 'webhook_success',
      duration: Date.now() - startTime,
      status: res.status,
    }));

    return { ok: true, status: res.status } as const;
  })
  .catch((err) => {
    clearTimeout(timeoutId);

    // Log error in background
    console.error(JSON.stringify({
      requestId,
      event: 'webhook_error',
      duration: Date.now() - startTime,
      error: err instanceof Error ? err.message : String(err),
      url: webhookUrl,
    }));

    return { ok: false, error: err } as const;
  });

  const timeoutPromise = new Promise<{ timeout: true }>((resolve) => {
    setTimeout(() => resolve({ timeout: true }), WEBHOOK_RESPONSE_TIMEOUT);
  });

  try {
    const result = await Promise.race([webhookPromise, timeoutPromise]);

    if ('timeout' in result) {
      // Timeout occurred: Return 202 Accepted
      console.log(JSON.stringify({
        requestId,
        event: 'response_timeout_accepted',
        message: 'Webhook pending, returning 202 to client',
        duration: Date.now() - startTime,
      }));
      return NextResponse.json({ success: true, status: 'accepted' }, { status: 202 });
    }

    // Webhook finished before timeout
    if (result.ok) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      // Webhook failed immediately
      // Returning 202 Accepted as per requirements for "fails" scenarios
      // to indicate we received the request, even if upstream failed momentarily.
      return NextResponse.json({ success: true, status: 'upstream_error' }, { status: 202 });
    }

  } catch (error) {
    console.error(JSON.stringify({
      requestId,
      event: 'lead_processing_critical_error',
      error: error instanceof Error ? error.message : String(error),
    }));
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 }
    );
  }
}
