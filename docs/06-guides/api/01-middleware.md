# Middleware System Documentation

**Breadcrumbs:** [Documentation](../../index.md) > [Guides](../index.md) > [API](./index.md) > Middleware

This guide explains the Next.js middleware implementation for request tracking and webhook integration.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Webhook System](#webhook-system)
- [Configuration](#configuration)
- [Usage Examples](#usage-examples)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)

## Overview

The middleware system intercepts all requests to the portfolio website and:

1. Tracks request metadata (URL, method, headers, timestamp)
2. Sends request data to configured webhooks (optional)
3. Adds debug headers in development mode
4. Handles errors gracefully without blocking requests

**Key features:**

- **Non-blocking** - Webhook failures don't affect page loads
- **Configurable** - Enable/disable via environment variables
- **Secure** - HTTPS-only webhooks in production
- **Selective** - Configure which headers to include
- **Performant** - Minimal overhead on request processing

## Architecture

### Files

```
middleware/
├── config.ts        # Middleware configuration
middleware.ts        # Main middleware implementation
```

### Request Flow

```
1. User Request → Next.js
2. Middleware intercepts
3. Process request metadata
4. Send to webhook (async, non-blocking)
5. Continue to page/API route
```

```typescript
// Simplified flow
export async function middleware(request: NextRequest) {
  const response = NextResponse.next(); // Continue request

  // Track in background (doesn't block response)
  sendToWebhook(request).catch(console.error);

  return response; // Response sent immediately
}
```

## Webhook System

### What is the Webhook?

The webhook sends request information to an external endpoint (e.g., Discord, Slack, custom analytics).

**Use cases:**

- Monitor site traffic
- Track user behavior
- Debug production issues
- Analytics dashboard
- Security monitoring

### Webhook Format

**Request payload:**

```json
{
  "content": "-# *09/02/2026 14:30:15*\n**`   GET`**: `https://simon.stijnen.be/projects`"
}
```

**Breakdown:**

- **Timestamp:** Request time in Europe/Brussels timezone
- **Method:** HTTP method (GET, POST, etc.)
- **URL:** Full request URL with query params

### Discord Integration Example

**Setup Discord webhook:**

1. Go to Discord Server Settings → Integrations → Webhooks
2. Click "New Webhook"
3. Copy webhook URL
4. Add to `.env`:

```bash
WEBHOOK_URL="https://discord.com/api/webhooks/123456789/abcdefghijk"
WEBHOOK_ENABLED="true"
```

**Result:**

Requests appear in Discord channel:

```
-# 09/02/2026 14:30:15
   GET: https://simon.stijnen.be/projects
```

### Custom Webhook Server

**Simple Express.js webhook receiver:**

```javascript
// webhook-server.js
const express = require("express");
const app = express();

app.use(express.json());

app.post("/webhook", (req, res) => {
  const { content } = req.body;
  console.log("📊 Request received:", content);

  // Store in database, send alert, etc.

  res.status(200).send("OK");
});

app.listen(3001, () => {
  console.log("Webhook server listening on port 3001");
});
```

**Run:**

```bash
node webhook-server.js
```

**Configure:**

```bash
WEBHOOK_URL="http://localhost:3001/webhook"
WEBHOOK_ENABLED="true"
```

## Configuration

### Environment Variables

**Required:**

```bash
WEBHOOK_URL="https://your-webhook-url.com"
WEBHOOK_ENABLED="true"
```

**Optional (defaults shown):**

```bash
NODE_ENV="production"
```

### Configuration File

**File:** `middleware/config.ts`

```typescript
export const webhookConfig = {
  url: process.env.WEBHOOK_URL || null,
  enabled: process.env.WEBHOOK_ENABLED === "true",
  includeHeaders: ["user-agent", "referer", "accept", "accept-language", "x-forwarded-for"],
};
```

**Configuration options:**

| Option           | Type       | Description                           |
| ---------------- | ---------- | ------------------------------------- |
| `url`            | `string`   | Webhook URL (HTTPS required in prod)  |
| `enabled`        | `boolean`  | Enable/disable webhook                |
| `includeHeaders` | `string[]` | List of headers to include in webhook |

### Path Exclusions

**Excluded paths** (not tracked):

```typescript
export const excludedPaths = [
  "api", // API routes
  "_next/static", // Static files
  "_next/image", // Image optimization
  "favicon.ico", // Favicon
  "robots.txt", // Robots file
  "sitemap.xml", // Sitemap
];
```

**Matcher configuration:**

```typescript
// middleware.ts
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml).*)"],
};
```

This regex excludes the paths above from middleware processing.

### Custom Header Inclusion

**Add custom headers to track:**

```typescript
// middleware/config.ts
export const webhookConfig = {
  // ... other config
  includeHeaders: [
    "user-agent",
    "referer",
    "accept-language",
    "x-forwarded-for",
    "x-real-ip", // Add custom header
    "cf-connecting-ip", // Cloudflare IP
  ],
};
```

**Access in webhook:**

```typescript
// middleware.ts
const headers: Record<string, string> = {};
webhookConfig.includeHeaders.forEach((header) => {
  const value = request.headers.get(header);
  if (value) headers[header] = value;
});

// Send headers in webhook payload
await fetch(webhookConfig.url, {
  method: "POST",
  body: JSON.stringify({ content, headers }),
});
```

## Usage Examples

### Example 1: Track Page Views

**Goal:** Count visits to each project page.

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Extract page path
  const path = request.nextUrl.pathname;

  // Check if project page
  if (path.startsWith("/projects/") && path !== "/projects") {
    const slug = path.replace("/projects/", "");

    // Send to analytics webhook
    await fetch(webhookConfig.url, {
      method: "POST",
      body: JSON.stringify({
        event: "project_view",
        slug,
        timestamp: new Date().toISOString(),
        userAgent: request.headers.get("user-agent"),
      }),
    }).catch(console.error);
  }

  return response;
}
```

### Example 2: Geo-Location Tracking

**Track visitor locations:**

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get IP address
  const ip =
    request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

  // Get country (if using Vercel/Cloudflare)
  const country = request.geo?.country || "Unknown";
  const city = request.geo?.city || "Unknown";

  // Send geo data
  await fetch(webhookConfig.url, {
    method: "POST",
    body: JSON.stringify({
      event: "page_view",
      path: request.nextUrl.pathname,
      country,
      city,
      ip,
    }),
  }).catch(console.error);

  return response;
}
```

### Example 3: Bot Detection

**Track bot visits separately:**

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const userAgent = request.headers.get("user-agent") || "";

  // Detect bots
  const isBot = /bot|crawler|spider|scraper/i.test(userAgent);

  if (isBot) {
    await fetch(webhookConfig.url, {
      method: "POST",
      body: JSON.stringify({
        event: "bot_visit",
        userAgent,
        path: request.nextUrl.pathname,
        timestamp: new Date().toISOString(),
      }),
    }).catch(console.error);
  }

  return response;
}
```

### Example 4: Rate Limiting

**Basic rate limiting implementation:**

```typescript
// middleware.ts
const rateLimitMap = new Map<string, number[]>();

export async function middleware(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

  // Get request timestamps for this IP
  const timestamps = rateLimitMap.get(ip) || [];
  const now = Date.now();

  // Remove timestamps older than 1 minute
  const recentTimestamps = timestamps.filter((t) => now - t < 60000);

  // Check if over limit (e.g., 100 requests per minute)
  if (recentTimestamps.length >= 100) {
    return new NextResponse("Rate limit exceeded", { status: 429 });
  }

  // Add current timestamp
  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);

  return NextResponse.next();
}
```

## Security Considerations

### HTTPS Enforcement

**Production requirement:**

```typescript
// middleware/config.ts
if (appConfig.isProduction && webhookUrl.protocol !== "https:") {
  console.warn("Webhook URL must be HTTPS in production");
  webhookConfig.url = null; // Disable
}
```

**Why:** Prevent leaking sensitive data over unencrypted connections.

### Header Sanitization

**Only include safe headers:**

```typescript
// ❌ BAD: Including sensitive headers
includeHeaders: [
  "authorization", // Contains auth tokens!
  "cookie", // Contains session data!
  "x-api-key", // Contains API keys!
];

// ✅ GOOD: Safe headers only
includeHeaders: ["user-agent", "referer", "accept-language"];
```

### Error Handling

**Never throw errors in middleware:**

```typescript
// ✅ GOOD: Catch all errors
try {
  await fetch(webhookConfig.url, {
    method: "POST",
    body: JSON.stringify({ content }),
  }).catch((error) => {
    console.error("Webhook error:", error);
  });
} catch (e) {
  console.error("Middleware error:", e);
}

// Request continues regardless
return response;
```

### Environment Validation

**Validate webhook URL:**

```typescript
// middleware/config.ts
if (webhookConfig.url) {
  try {
    const url = new URL(webhookConfig.url);
    if (url.protocol !== "https:" && appConfig.isProduction) {
      webhookConfig.url = null;
    }
  } catch (error) {
    console.error("Invalid webhook URL:", error);
    webhookConfig.url = null;
  }
}
```

## Troubleshooting

### Issue: Webhook not firing

**Checklist:**

1. **Check environment variables:**

```bash
echo $WEBHOOK_URL
echo $WEBHOOK_ENABLED
```

2. **Verify webhook is enabled:**

```typescript
console.log("Webhook config:", webhookConfig);
```

3. **Check path is not excluded:**

```bash
# These paths are excluded by default:
/api/*
/_next/static/*
/_next/image/*
/favicon.ico
/robots.txt
/sitemap.xml
```

4. **Test webhook URL manually:**

```bash
curl -X POST "https://your-webhook.com" \
  -H "Content-Type: application/json" \
  -d '{"content":"Test message"}'
```

### Issue: Webhook errors in logs

**Common errors:**

**1. Network timeout:**

```
Error: request to https://webhook.com failed, reason: ETIMEDOUT
```

**Solution:** Check webhook URL is accessible from your server.

**2. Invalid JSON:**

```
Error: Unexpected token < in JSON
```

**Solution:** Webhook endpoint might be returning HTML instead of JSON.

**3. SSL certificate error:**

```
Error: unable to verify the first certificate
```

**Solution:** Use valid SSL certificate for webhook endpoint.

### Issue: Middleware not running

**Check Next.js version:**

```bash
npm list next
# Should be 13.0.0 or higher for middleware support
```

**Verify middleware.ts location:**

```bash
# Must be at project root
ls -la middleware.ts
```

**Check config matcher:**

```typescript
// middleware.ts - Must export config
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*))"],
};
```

### Issue: Performance impact

**If middleware slows down requests:**

1. **Disable webhook in development:**

```bash
# .env.development
WEBHOOK_ENABLED="false"
```

2. **Use async fire-and-forget:**

```typescript
// Don't await webhook
fetch(webhookConfig.url, { ... }).catch(console.error);
return response; // Return immediately
```

3. **Increase timeout:**

```typescript
await fetch(webhookConfig.url, {
  method: "POST",
  body: JSON.stringify({ content }),
  signal: AbortSignal.timeout(5000), // 5 second timeout
}).catch(console.error);
```

## See Also

- [LLMs.txt Documentation](./02-llms-txt.md) - AI agent discovery endpoint
- [File Download API](./03-file-download.md) - Secure file downloads
- [Best Practices](../03-best-practices.md) - Code patterns
- [Configuration](../utilities/02-config-library.md) - Environment variables

## Next Steps

- Set up webhook endpoint (Discord, Slack, custom)
- Configure environment variables
- Test in development
- Monitor webhook logs
- Implement custom tracking logic

---

**Last Updated:** February 2026  
**Maintainers:** Simon Stijnen  
**Questions?** Open an issue on GitHub
