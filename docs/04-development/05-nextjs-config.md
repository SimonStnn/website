# Next.js Configuration

**Navigation:** [Home](../index.md) > [Development](./README.md) > Next.js Configuration

---

## Overview

This guide explains the Next.js configuration file (`next.config.ts`) for the Simon Stijnen Portfolio project, covering images, output modes, bundle analysis, and how to customize the configuration.

## Configuration File

The project uses TypeScript for Next.js configuration located at `/workspaces/website/next.config.ts`.

### Complete Configuration

```typescript
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

// Import site configuration for URL parsing
import { siteConfig } from "./lib/config";

// Extract domain from site URL
const siteUrlDomain = new URL(siteConfig.url).hostname;

// Common domains for images
const commonDomains = [
  "github.githubassets.com",
  "github.com",
  "colorsplash.vercel.app",
  "flagcdn.com",
];
const domains = ["localhost", siteUrlDomain, ...commonDomains];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: domains.map((domain) => ({
      protocol: "https",
      hostname: domain,
      port: "",
      pathname: "/**",
    })),
  },
  // For Docker deployment - creates a standalone build
  output: "standalone",
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
```

## Configuration Options

### Image Configuration

The `images` configuration enables Next.js Image Optimization for remote images.

#### Remote Patterns

**Purpose:** Allow loading images from external domains with Next.js `<Image>` component.

**Configuration:**

```typescript
images: {
  remotePatterns: domains.map((domain) => ({
    protocol: "https",
    hostname: domain,
    port: "",
    pathname: "/**",
  })),
}
```

**Allowed domains:**

1. **localhost** - For local development
2. **Site domain** (from `NEXT_PUBLIC_SITE_URL`) - Your own domain
3. **GitHub assets** (`github.githubassets.com`, `github.com`) - GitHub-hosted images
4. **Color Splash** (`colorsplash.vercel.app`) - Color palette tool
5. **Flag CDN** (`flagcdn.com`) - Country flags

**Remote pattern structure:**

```typescript
{
  protocol: "https",      // Only HTTPS allowed
  hostname: "example.com", // Domain name
  port: "",               // Empty for standard ports (80/443)
  pathname: "/**"         // Allow all paths
}
```

#### Adding New Domains

**Example: Add Imgur support**

```typescript
const commonDomains = [
  "github.githubassets.com",
  "github.com",
  "colorsplash.vercel.app",
  "flagcdn.com",
  "i.imgur.com", // Add Imgur
];
```

**Example: Add custom API**

```typescript
const commonDomains = [
  // ... existing domains
  "api.mysite.com",
];
```

**Restart required:**

```bash
# Stop dev server (Ctrl + C)
npm run dev
```

#### Using Remote Images

**In components:**

```tsx
import Image from "next/image";

export function ProjectImage() {
  return (
    <Image
      src="https://github.com/username/repo/raw/main/screenshot.png"
      alt="Project screenshot"
      width={800}
      height={600}
    />
  );
}
```

**Security:**

- Only domains in `remotePatterns` are allowed
- Prevents unauthorized image loading
- Protects against hotlinking abuse

**Error if domain not allowed:**

```
Error: Invalid src prop (https://unauthorized-site.com/image.png) on `next/image`,
hostname "unauthorized-site.com" is not configured under images in your `next.config.ts`.
```

### Output Mode

**Purpose:** Configure build output format for different deployment scenarios.

**Current configuration:**

```typescript
output: "standalone";
```

#### Standalone Mode

**What it does:**

- Creates a self-contained build in `.next/standalone/`
- Includes only necessary files for production
- Copies `node_modules` dependencies needed at runtime
- Optimized for Docker and serverless deployments

**Build output:**

```
.next/
├── standalone/           # Standalone deployment package
│   ├── node_modules/    # Only production dependencies
│   ├── server.js        # Production server
│   └── package.json     # Minimal dependencies
├── static/              # Static assets (must be copied separately)
└── cache/               # Build cache
```

**Usage with Docker:**

```dockerfile
# Dockerfile
FROM node:20-alpine AS runner

WORKDIR /app

# Copy standalone build
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

**Benefits:**

- Smaller Docker images (only needed dependencies)
- Faster deployments
- Reduced attack surface

#### Other Output Modes

**Default mode (no output specified):**

```typescript
// No output property = default mode
const nextConfig: NextConfig = {
  // ...
};
```

- Standard Next.js build
- Use with Node.js server or Vercel deployment
- Requires full `node_modules` directory

**Export mode:**

```typescript
output: "export";
```

- Generates static HTML files (SSG only)
- No Node.js server required
- Cannot use server-side features (API routes, dynamic rendering)
- Suitable for GitHub Pages, S3, CDN hosting

**When to use each mode:**

| Mode         | Use Case                           | Server Required | Dynamic Features |
| ------------ | ---------------------------------- | --------------- | ---------------- |
| `standalone` | Docker, AWS, serverless            | ✅ Yes          | ✅ Yes           |
| Default      | Vercel, standard Node.js hosting   | ✅ Yes          | ✅ Yes           |
| `export`     | Static hosting (GitHub Pages, CDN) | ❌ No           | ❌ No            |

### Bundle Analyzer

**Purpose:** Visualize bundle size and analyze dependencies.

**Configuration:**

```typescript
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
```

**How it works:**

1. Wraps Next.js config with analyzer plugin
2. Enabled only when `ANALYZE=true` environment variable is set
3. Opens interactive bundle visualization in browser

**Usage:**

```bash
npm run build:analyze
# or
ANALYZE=true npm run build
```

**Output:**

- Opens browser at `http://127.0.0.1:8888`
- Shows tree map of all modules
- Displays sizes (parsed, gzipped, compressed)
- Interactive filtering and drilling down

**See also:** [Bundle Analysis](./10-bundle-analysis.md)

## Advanced Configuration

### TypeScript Configuration

**Import type safety:**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeScript provides autocompletion and type checking
  images: {
    remotePatterns: [
      // ...
    ],
  },
};
```

**Benefits:**

- Autocompletion in IDE
- Type errors caught before build
- Better documentation via types

### Environment-Based Configuration

**Example: Different settings per environment**

```typescript
import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Disable image optimization in development for faster builds
  images: {
    unoptimized: isDevelopment,
    remotePatterns: [
      // ...
    ],
  },

  // Use standalone only in production
  ...(isProduction && { output: "standalone" }),

  // Enable strict mode in development
  reactStrictMode: true,

  // Compress in production only
  compress: isProduction,
};

export default nextConfig;
```

### Custom Headers

**Add security headers:**

```typescript
const nextConfig: NextConfig = {
  // ... existing config

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};
```

### Redirects

**Add URL redirects:**

```typescript
const nextConfig: NextConfig = {
  // ... existing config

  async redirects() {
    return [
      {
        source: "/old-path",
        destination: "/new-path",
        permanent: true, // 308 redirect
      },
      {
        source: "/github",
        destination: "https://github.com/SimonStnn",
        permanent: false, // 307 redirect
      },
    ];
  },
};
```

### Rewrites

**Proxy API requests:**

```typescript
const nextConfig: NextConfig = {
  // ... existing config

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.external-service.com/:path*",
      },
    ];
  },
};
```

### Webpack Configuration

**Customize webpack:**

```typescript
import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  // ... existing config

  webpack: (config: Configuration, { isServer }) => {
    // Add custom webpack plugins
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },
};
```

### Experimental Features

**Enable experimental Next.js features:**

```typescript
const nextConfig: NextConfig = {
  // ... existing config

  experimental: {
    // Enable Server Actions
    serverActions: {
      bodySizeLimit: "2mb",
    },

    // Optimize package imports
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
};
```

## Common Configuration Patterns

### Adding Environment-Based Domains

```typescript
// Dynamic domains based on environment
const getImageDomains = () => {
  const baseDomains = ["localhost", siteUrlDomain];

  if (process.env.NODE_ENV === "development") {
    return [...baseDomains, "*.local", "192.168.1.*"];
  }

  return [...baseDomains, ...commonDomains];
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: getImageDomains().map((domain) => ({
      protocol: "https",
      hostname: domain,
      port: "",
      pathname: "/**",
    })),
  },
};
```

### Conditional Build Features

```typescript
const nextConfig: NextConfig = {
  // Disable source maps in production for smaller builds
  productionBrowserSourceMaps: false,

  // Enable SWC minification (faster than Terser)
  swcMinify: true,

  // Disable X-Powered-By header
  poweredByHeader: false,

  // Compress responses in production
  compress: true,
};
```

### TypeScript Path Aliases

```typescript
const nextConfig: NextConfig = {
  // Path aliases are configured in tsconfig.json, not here
  // But you can customize webpack resolution:
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "components"),
    };
    return config;
  },
};
```

**Note:** Prefer using `tsconfig.json` for path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@components/*": ["components/*"]
    }
  }
}
```

## Validation and Testing

### Verify Configuration

**Check if config loads without errors:**

```bash
npm run build
```

**Output should show:**

```
▲ Next.js 15.5.9
Creating an optimized production build ...
✓ Compiled successfully
```

**If config has errors:**

```
Error: Invalid next.config.ts options detected:
  - images.remotePatterns[0].protocol must be 'http' or 'https'
```

### Test Image Loading

**Create test page:**

```tsx
// app/test-images/page.tsx
import Image from "next/image";

export default function TestImages() {
  return (
    <div>
      <h1>Image Loading Test</h1>

      {/* Local image */}
      <Image src="/images/projects/test/image.png" alt="Local" width={400} height={300} />

      {/* Remote image (GitHub) */}
      <Image
        src="https://github.com/username/repo/raw/main/image.png"
        alt="GitHub"
        width={400}
        height={300}
      />

      {/* External domain */}
      <Image src="https://flagcdn.com/w320/be.png" alt="Belgium flag" width={320} height={213} />
    </div>
  );
}
```

Visit `http://localhost:3000/test-images` and check:

- All images load
- No console errors
- Images are optimized (check Network tab for WebP/AVIF formats)

### Debug Configuration

**Log configuration:**

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  // ... config
};

console.log("Next.js Config:", JSON.stringify(nextConfig, null, 2));

export default nextConfig;
```

**Run:**

```bash
npm run build
# Check terminal output for logged config
```

## Migration and Updates

### Migrating from JavaScript

**Old `next.config.js`:**

```javascript
const bundleAnalyzer = require("@next/bundle-analyzer");

module.exports = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})({
  images: {
    domains: ["example.com"],
  },
});
```

**New `next.config.ts`:**

```typescript
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**",
      },
    ],
  },
};

export default bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
```

### Updating Next.js

**After updating Next.js:**

```bash
npm install next@latest
```

**Check for breaking changes:**

```bash
npm run build
# Review any deprecation warnings
```

**Update configuration if needed:**

```typescript
// Example: New Next.js version deprecates 'domains'
// Old:
images: {
  domains: ["example.com"];
}

// New (remotePatterns):
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "example.com",
    },
  ];
}
```

## Troubleshooting

### Issue: Image Domain Not Allowed

**Error:**

```
Invalid src prop (https://example.com/image.png) on `next/image`,
hostname "example.com" is not configured
```

**Solution:**

```typescript
// Add domain to remotePatterns
const commonDomains = [
  // ... existing
  "example.com",
];
```

Restart dev server after config changes.

### Issue: Build Fails with Config Error

**Error:**

```
TypeError: Cannot read property 'map' of undefined
```

**Solution:**

Check that `siteConfig.url` is properly set in `.env`:

```env
NEXT_PUBLIC_SITE_URL="https://your-site.com"
```

### Issue: Standalone Build Missing Files

**Error:**

```
Error: Cannot find module '/app/.next/static/...'
```

**Solution:**

Ensure you copy `static` directory in Dockerfile:

```dockerfile
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public
```

## Best Practices

### Security

- ✅ Only allow trusted image domains
- ✅ Use HTTPS for remote images
- ✅ Set `poweredByHeader: false` to hide Next.js
- ✅ Add security headers

### Performance

- ✅ Use `standalone` output for Docker
- ✅ Enable compression
- ✅ Disable source maps in production
- ✅ Use SWC minification

### Maintainability

- ✅ Use TypeScript for config
- ✅ Extract reusable functions
- ✅ Document custom configurations
- ✅ Use environment variables for domains

## See Also

- [Environment Variables](./03-environment-variables.md) - Configure site URL and other env vars
- [TypeScript Configuration](./06-typescript-config.md) - TypeScript compiler settings
- [Bundle Analysis](./10-bundle-analysis.md) - Analyze bundle size
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Configuration Reference](https://nextjs.org/docs/app/api-reference/next-config-js)

## Next Steps

- [Configure TypeScript](./06-typescript-config.md) for type checking
- [Analyze your bundle](./10-bundle-analysis.md) to optimize performance
- [Set up testing](./07-testing.md) to ensure config changes work correctly

---

**Last updated:** February 2026
