FROM node:20-alpine AS base

# Install libc6-compat for sharp compatibility (needed by Payload/Next.js image optimization)
RUN apk add --no-cache libc6-compat

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build args to prevent build failure if Payload validates env vars
ARG PAYLOAD_SECRET=dummy_secret_for_build
ARG DATABASE_URI=postgres://dummy:5432/dummy

# Build the application
# Desativa a exportação estática de rotas problemáticas no build
RUN NEXT_OUTPUT_TYPE=standalone npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Media upload directory for Payload
RUN mkdir -p media
RUN chown -R nextjs:nodejs media

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy health check script
COPY --from=builder --chown=nextjs:nodejs /app/src/scripts/check-env.js ./check-env.js

USER nextjs

EXPOSE 3010

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["sh", "-c", "node check-env.js && node server.js"]
