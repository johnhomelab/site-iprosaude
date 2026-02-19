
import { POST } from '../src/app/api/leads/route.ts';
import { NextResponse } from 'next/server';

// Setup environment
process.env.N8N_WEBHOOK_URL = 'http://mock-n8n.local/webhook';

async function runBenchmark() {
  console.log('Starting Benchmark for /api/leads...');

  // Mock Fetch
  const originalFetch = global.fetch;

  const mockFetch = (delayMs: number, shouldFail: boolean = false) => {
    return async (url: string | URL | Request, init?: RequestInit) => {
      await new Promise(resolve => setTimeout(resolve, delayMs));
      if (shouldFail) {
        return {
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
          json: async () => ({ error: 'Mock Error' }),
        } as Response;
      }
      return {
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => ({ success: true }),
      } as Response;
    };
  };

  const testCases = [
    { name: 'Fast Webhook (200ms)', delay: 200, fail: false },
    { name: 'Slow Webhook (5000ms)', delay: 5000, fail: false },
    { name: 'Failed Webhook (100ms)', delay: 100, fail: true },
  ];

  for (const test of testCases) {
    console.log(`\nRunning Test: ${test.name}`);

    // Override global fetch
    global.fetch = mockFetch(test.delay, test.fail) as any;

    const req = new Request('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test User', email: 'test@example.com' }),
    });

    const start = performance.now();
    try {
      const res = await POST(req);
      const end = performance.now();
      const duration = (end - start).toFixed(2);

      const status = res.status;
      // If res.json is a promise (NextResponse), await it?
      // NextResponse.json() returns a Response object. Response.json() returns a promise.
      // But we are running in Node context with Next.js polyfills hopefully.
      // Actually POST returns a NextResponse which is a Response.

      let body;
      try {
        body = await res.json();
      } catch (e) {
        body = 'Could not parse JSON';
      }

      console.log(`Duration: ${duration}ms`);
      console.log(`Status: ${status}`);
      console.log(`Body:`, body);

    } catch (error) {
      console.error('Error calling POST:', error);
    }
  }

  // Restore fetch
  global.fetch = originalFetch;
}

runBenchmark().catch(console.error);
