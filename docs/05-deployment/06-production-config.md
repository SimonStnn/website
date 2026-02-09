# Production Configuration

**Navigation:** [Home](../index.md) → [Deployment](./README.md) → Production Configuration

---

## Overview

This comprehensive guide covers production configuration for the Simon Stijnen Portfolio website, including security hardening, performance optimization, monitoring, and operational best practices.

## Table of Contents

- [Environment Configuration](#environment-configuration)
- [Security Hardening](#security-hardening)
- [Performance Optimization](#performance-optimization)
- [Monitoring and Logging](#monitoring-and-logging)
- [Backup and Recovery](#backup-and-recovery)
- [SSL/TLS Configuration](#ssltls-configuration)
- [Rate Limiting and DDoS Protection](#rate-limiting-and-ddos-protection)
- [Health Checks and Uptime](#health-checks-and-uptime)

---

## Environment Configuration

### Environment Variables

#### Required Variables

```bash
# .env.production
NODE_ENV=production
PORT=3000

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://simonstijnen.com
NEXT_PUBLIC_SITE_NAME="Simon Stijnen"

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_VERCEL_ANALYTICS=true

# API Configuration (If applicable)
API_URL=https://api.simonstijnen.com
API_TIMEOUT=10000
```

#### Security Variables

```bash
# Never commit these to git
DATABASE_URL=postgresql://user:password@host:5432/db
REDIS_URL=redis://host:6379
SECRET_KEY=your-secret-key-here
JWT_SECRET=your-jwt-secret-here

# Third-party API keys
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
SENDGRID_API_KEY=SG.xxxxxxxxxxxx
```

### Environment File Structure

```bash
# Development
.env.development        # Local development
.env.development.local  # Local overrides (gitignored)

# Production
.env.production         # Production defaults (can be committed)
.env.production.local   # Production secrets (gitignored)

# Testing
.env.test              # Test environment
```

### Example .gitignore

```plaintext
# Environment files
.env*.local
.env.production
.env.development

# Keep example files
!.env.example
!.env.production.example
```

### Environment Variable Management

#### Docker

```yaml
# docker-compose.yml
services:
  website:
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SITE_URL=${SITE_URL}
    env_file:
      - .env.production
```

#### Kubernetes

```yaml
# ConfigMap for non-sensitive data
apiVersion: v1
kind: ConfigMap
metadata:
  name: website-config
data:
  NODE_ENV: "production"
  NEXT_PUBLIC_SITE_URL: "https://simonstijnen.com"

---
# Secret for sensitive data
apiVersion: v1
kind: Secret
metadata:
  name: website-secrets
type: Opaque
stringData:
  DATABASE_URL: "postgresql://user:password@host:5432/db"
  API_KEY: "your-api-key"

---
# Deployment using both
apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      containers:
        - name: website
          envFrom:
            - configMapRef:
                name: website-config
            - secretRef:
                name: website-secrets
```

#### Cloud Platforms

**Vercel:**

```bash
# Add via dashboard or CLI
vercel env add NEXT_PUBLIC_GA_ID production
vercel env add DATABASE_URL production
```

**Railway:**

```bash
railway variables set DATABASE_URL=postgresql://...
railway variables set REDIS_URL=redis://...
```

---

## Security Hardening

### Security Architecture

```mermaid
graph TD
    A[Client] -->|HTTPS| B[WAF/CDN]
    B -->|Rate Limited| C[Load Balancer]
    C --> D[Reverse Proxy]
    D -->|Security Headers| E[Next.js App]

    F[Firewall] -.->|Filter| B
    G[DDoS Protection] -.->|Mitigate| B
    H[SSL/TLS] -.->|Encrypt| B
    I[CSP Headers] -.->|Protect| E

    style B fill:#f39c12,color:#fff
    style D fill:#9b59b6,color:#fff
    style E fill:#27ae60,color:#fff
```

### Security Headers

#### Next.js Configuration

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Prevent MIME sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Enable XSS protection
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Referrer policy
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions policy
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
          },
          // HSTS (if using HTTPS)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

// Content Security Policy
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https: blob:;
  font-src 'self' data:;
  connect-src 'self' https://vitals.vercel-insights.com;
  media-src 'self';
  frame-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;
```

### Nginx Reverse Proxy Configuration

```nginx
# /etc/nginx/sites-available/website
server {
    listen 80;
    server_name simonstijnen.com www.simonstijnen.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name simonstijnen.com www.simonstijnen.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/simonstijnen.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/simonstijnen.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Security Headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;

    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=website:10m rate=10r/s;
    limit_req zone=website burst=20 nodelay;
    limit_req_status 429;

    # Client Body Size Limit
    client_max_body_size 10M;

    # Timeouts
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;

    # Proxy to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Block access to sensitive files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Block access to specific paths
    location ~ ^/(\.env|\.git|docker-compose\.yml|Dockerfile) {
        deny all;
        return 404;
    }
}
```

### Firewall Configuration

#### UFW (Ubuntu)

```bash
# Enable firewall
ufw default deny incoming
ufw default allow outgoing

# Allow SSH
ufw allow 22/tcp

# Allow HTTP/HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw enable

# View status
ufw status verbose
```

#### Fail2Ban (Brute Force Protection)

```bash
# Install
apt-get install -y fail2ban

# Configure
cat > /etc/fail2ban/jail.local <<'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
logpath = /var/log/nginx/error.log
maxretry = 3
EOF

# Start service
systemctl enable fail2ban
systemctl start fail2ban

# View banned IPs
fail2ban-client status nginx-limit-req
```

### Docker Security

#### Non-Root User

```dockerfile
# Already implemented in Dockerfile
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
```

#### Read-Only Filesystem

```yaml
# docker-compose.yml
services:
  website:
    read_only: true
    tmpfs:
      - /tmp
      - /app/.next/cache
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
```

#### Image Scanning

```bash
# Scan with Trivy
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy:latest image ghcr.io/simonstnn/website:latest

# Scan with Snyk
snyk container test ghcr.io/simonstnn/website:latest
```

---

## Performance Optimization

### Performance Stack

```mermaid
graph TD
    A[Client] --> B[CDN/Edge Cache]
    B --> C[Load Balancer]
    C --> D[Application Cache]
    D --> E[Next.js App]
    E --> F[Database Cache]

    G[Redis] -.->|Cache| D
    H[ISR] -.->|Static Gen| E
    I[Image Optimization] -.->|Optimize| E

    style B fill:#f39c12,color:#fff
    style D fill:#9b59b6,color:#fff
    style E fill:#27ae60,color:#fff
```

### Next.js Configuration

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  // Production build optimization
  output: "standalone",

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.simonstijnen.com",
      },
    ],
  },

  // Compression
  compress: true,

  // React strict mode
  reactStrictMode: true,

  // PoweredBy header removal
  poweredByHeader: false,

  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["@/components", "@/lib"],
  },
};
```

### Caching Strategy

#### HTTP Caching

```typescript
// app/api/route.ts
export async function GET() {
  return new Response(JSON.stringify({ data: "example" }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
```

**Cache-Control directives:**

- `public` - Can be cached by CDN
- `private` - Only browser cache
- `s-maxage=3600` - CDN cache for 1 hour
- `max-age=3600` - Browser cache for 1 hour
- `stale-while-revalidate=86400` - Serve stale for 24 hours while revalidating
- `no-store` - Never cache

#### Static Generation

```typescript
// app/projects/[slug]/page.tsx
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export const revalidate = 3600; // ISR: Revalidate every hour
```

### CDN Configuration

#### Cloudflare

```bash
# Page Rules
1. Cache Everything: *.simonstijnen.com/*
   - Cache Level: Standard
   - Edge Cache TTL: 1 month
   - Browser Cache TTL: 4 hours

2. Bypass Cache: simonstijnen.com/api/*
   - Cache Level: Bypass

# Cache Rules
Cache static assets:
  - *.js, *.css, *.jpg, *.png, *.svg, *.woff, *.woff2
  - Edge TTL: 1 year
  - Browser TTL: 1 month
```

---

## Monitoring and Logging

### Monitoring Architecture

```mermaid
graph TD
    A[Application] -->|Metrics| B[Prometheus]
    A -->|Logs| C[Loki/ELK]
    A -->|Traces| D[Jaeger/Tempo]

    B --> E[Grafana]
    C --> E
    D --> E

    E -->|Alerts| F[AlertManager]
    F -->|Notify| G[Email/Slack/PagerDuty]

    H[Health Checks] -->|Status| I[Uptime Monitor]
    I -->|Alert| F

    style E fill:#f39c12,color:#fff
    style F fill:#e74c3c,color:#fff
```

### Application Logging

#### Structured Logging

```typescript
// lib/logger.ts
import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        }
      : undefined,
});

// Usage
logger.info({ userId: 123, action: "login" }, "User logged in");
logger.error({ error: err, context: "database" }, "Database connection failed");
```

#### Docker Logging

```yaml
# docker-compose.yml
services:
  website:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
        labels: "production,website"
```

### Metrics Collection

#### Prometheus Metrics

```typescript
// lib/metrics.ts
import { Counter, Histogram, register } from "prom-client";

// HTTP request counter
export const httpRequestCounter = new Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "path", "status"],
});

// Response time histogram
export const httpRequestDuration = new Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration",
  labelNames: ["method", "path"],
  buckets: [0.1, 0.5, 1, 2, 5],
});

// API endpoint
export async function GET() {
  const metrics = await register.metrics();
  return new Response(metrics, {
    headers: { "Content-Type": register.contentType },
  });
}
```

### Error Tracking

#### Sentry Integration

```typescript
// instrumentation.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,

  // Don't capture errors in development
  enabled: process.env.NODE_ENV === "production",

  // Release tracking
  release: process.env.VERCEL_GIT_COMMIT_SHA,

  // Error filtering
  beforeSend(event, hint) {
    // Don't send 404 errors
    if (event.exception?.values?.[0]?.value?.includes("404")) {
      return null;
    }
    return event;
  },
});
```

### Uptime Monitoring

#### UptimeRobot Configuration

```bash
# Monitor Configuration
URL: https://simonstijnen.com
Type: HTTP(s)
Interval: 5 minutes
Timeout: 30 seconds

# Alert Contacts
- Email: admin@simonstijnen.com
- Slack: #alerts channel
- SMS: +1-xxx-xxx-xxxx

# Status Page
Public status page: https://status.simonstijnen.com
```

#### Custom Health Check

```typescript
// app/api/health/route.ts
export async function GET() {
  const checks = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),

    // External dependencies
    services: {
      database: await checkDatabase(),
      redis: await checkRedis(),
    },
  };

  const allHealthy = Object.values(checks.services).every((status) => status === "healthy");

  return Response.json(checks, {
    status: allHealthy ? 200 : 503,
  });
}

async function checkDatabase(): Promise<string> {
  try {
    // Ping database
    return "healthy";
  } catch (error) {
    return "unhealthy";
  }
}
```

---

## Backup and Recovery

### Backup Strategy

```mermaid
graph TD
    A[Production Data] --> B[Daily Backup]
    B --> C[Local Storage]
    C --> D[Remote Storage]

    E[Weekly Backup] --> D
    F[Monthly Backup] --> D

    D --> G[S3/Cloud Storage]
    D --> H[Off-site Backup]

    I[Disaster Recovery] -.->|Restore| A
    G -.->|Retrieve| I

    style A fill:#27ae60,color:#fff
    style D fill:#3498db,color:#fff
    style I fill:#e74c3c,color:#fff
```

### Backup Script

```bash
#!/bin/bash
# /root/backup.sh

# Configuration
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup application files
tar -czf "$BACKUP_DIR/website_${DATE}.tar.gz" \
  /root/website \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git

# Backup Docker volumes (if any)
docker run --rm \
  -v personal-website-data:/data \
  -v "$BACKUP_DIR":/backup \
  alpine tar -czf /backup/volumes_${DATE}.tar.gz /data

# Backup to S3 (optional)
aws s3 sync "$BACKUP_DIR" s3://backups-bucket/website/ \
  --storage-class STANDARD_IA

# Clean old backups
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +$RETENTION_DAYS -delete

# Send notification
echo "Backup completed: $(date)" | \
  mail -s "Website Backup Success" admin@simonstijnen.com
```

### Automated Backups

```bash
# Add to crontab
crontab -e

# Daily backup at 2 AM
0 2 * * * /root/backup.sh

# Weekly backup on Sunday at 3 AM
0 3 * * 0 /root/backup-weekly.sh

# Monthly backup on 1st at 4 AM
0 4 1 * * /root/backup-monthly.sh
```

### Recovery Procedure

```bash
#!/bin/bash
# /root/restore.sh

# Stop application
docker compose down

# Restore application files
tar -xzf /backups/website_20260209_020000.tar.gz -C /

# Restore Docker volumes
docker run --rm \
  -v personal-website-data:/data \
  -v /backups:/backup \
  alpine tar -xzf /backup/volumes_20260209_020000.tar.gz -C /

# Start application
cd /root/website
docker compose up -d

# Verify
curl -f http://localhost:3000 || echo "Restore verification failed"
```

---

## SSL/TLS Configuration

### Let's Encrypt Setup

```bash
# Install Certbot
apt-get install -y certbot python3-certbot-nginx

# Obtain certificate
certbot --nginx -d simonstijnen.com -d www.simonstijnen.com

# Verify auto-renewal
certbot renew --dry-run

# Auto-renewal is configured via systemd timer
systemctl status certbot.timer
```

### SSL Testing

```bash
# Test SSL configuration
openssl s_client -connect simonstijnen.com:443 -servername simonstijnen.com

# Check certificate expiry
echo | openssl s_client -servername simonstijnen.com -connect simonstijnen.com:443 2>/dev/null | \
  openssl x509 -noout -dates

# SSL Labs test (online)
# https://www.ssllabs.com/ssltest/analyze.html?d=simonstijnen.com
```

---

## Rate Limiting and DDoS Protection

### Nginx Rate Limiting

```nginx
# Rate limiting zones
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=api:10m rate=5r/s;
limit_req_zone $binary_remote_addr zone=login:10m rate=1r/m;

# Connection limiting
limit_conn_zone $binary_remote_addr zone=addr:10m;
limit_conn addr 10;

server {
    # General rate limit
    location / {
        limit_req zone=general burst=20 nodelay;
        proxy_pass http://localhost:3000;
    }

    # API rate limit
    location /api/ {
        limit_req zone=api burst=10 nodelay;
        limit_req_status 429;
        proxy_pass http://localhost:3000;
    }

    # Login rate limit (stricter)
    location /api/auth/login {
        limit_req zone=login burst=3 nodelay;
        proxy_pass http://localhost:3000;
    }
}
```

### Application-Level Rate Limiting

```typescript
// middleware.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
});

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      }
    );
  }

  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Limit", limit.toString());
  response.headers.set("X-RateLimit-Remaining", remaining.toString());
  return response;
}

export const config = {
  matcher: "/api/:path*",
};
```

### DDoS Protection

**Cloudflare Protection:**

```bash
# Enable Under Attack Mode (temporarily)
# Dashboard → Security → Settings → Security Level → Under Attack

# Rate limiting rules
# Dashboard → Security → WAF → Rate limiting rules
- Rule: API Protection
  - If: URL Path contains /api/
  - Then: Challenge if > 100 requests per minute
```

---

## Health Checks and Uptime

### Comprehensive Health Check

```typescript
// app/api/health/route.ts
export async function GET() {
  const startTime = Date.now();

  const health = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    responseTime: 0,

    system: {
      memory: {
        used: process.memoryUsage().heapUsed,
        total: process.memoryUsage().heapTotal,
        percentage: (process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100,
      },
      cpu: process.cpuUsage(),
    },

    services: {
      database: await checkService("database"),
      redis: await checkService("redis"),
      storage: await checkService("storage"),
    },
  };

  health.responseTime = Date.now() - startTime;

  // Determine overall health
  const allHealthy = Object.values(health.services).every(
    (service: any) => service.status === "healthy"
  );

  health.status = allHealthy ? "healthy" : "degraded";

  return Response.json(health, {
    status: allHealthy ? 200 : 503,
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}

async function checkService(name: string) {
  try {
    // Implement actual service checks
    return { status: "healthy", responseTime: 0 };
  } catch (error) {
    return { status: "unhealthy", error: String(error) };
  }
}
```

### Docker Health Check

Already implemented in Dockerfile:

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --spider http://localhost:3000/ || exit 1
```

### Kubernetes Probes

```yaml
# deployment.yaml
spec:
  containers:
    - name: website
      livenessProbe:
        httpGet:
          path: /api/health
          port: 3000
        initialDelaySeconds: 30
        periodSeconds: 10
        timeoutSeconds: 5
        failureThreshold: 3

      readinessProbe:
        httpGet:
          path: /api/health
          port: 3000
        initialDelaySeconds: 5
        periodSeconds: 5
        timeoutSeconds: 3
        failureThreshold: 3

      startupProbe:
        httpGet:
          path: /api/health
          port: 3000
        initialDelaySeconds: 0
        periodSeconds: 10
        timeoutSeconds: 3
        failureThreshold: 30
```

---

## See Also

- [Docker Guide](./01-docker-guide.md) - Docker deployment fundamentals
- [CI/CD Pipeline](./04-ci-cd.md) - Automated deployment workflows
- [Deployment Strategies](./05-deployment-strategies.md) - Platform comparisons
- [Dockerfile Documentation](./02-dockerfile.md) - Container optimization

---

## Next Steps

1. **Environment Setup**: Configure [environment variables](#environment-configuration)
2. **Security Implementation**: Apply [security hardening](#security-hardening) measures
3. **Monitoring Setup**: Configure [monitoring and logging](#monitoring-and-logging)
4. **Backup Strategy**: Implement [backup procedures](#backup-and-recovery)
5. **Deploy**: Follow [deployment strategy](./05-deployment-strategies.md) guide

---

**Last Updated:** February 2026  
**Next.js Version:** 15.1.6  
**Security Standards:** OWASP Top 10, CIS Docker Benchmark  
**Monitoring:** Prometheus, Grafana, Sentry compatible
