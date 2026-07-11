# Google Analytics & Google Tag Manager

**Breadcrumbs:** [Documentation](../../index.md) > [Guides](../index.md) > [SEO](./index.md) > Analytics

This guide explains the Google Analytics and Google Tag Manager implementation for tracking website metrics.

## Table of Contents

- [Overview](#overview)
- [Google Analytics Setup](#google-analytics-setup)
- [Google Tag Manager Setup](#google-tag-manager-setup)
- [Implementation](#implementation)
- [Event Tracking](#event-tracking)
- [Privacy Considerations](#privacy-considerations)
- [Testing](#testing)

## Overview

The portfolio uses both Google Analytics 4 (GA4) and Google Tag Manager (GTM) for comprehensive analytics tracking.

**Features:**

- Page view tracking
- Event tracking (downloads, clicks, etc.)
- User behavior analysis
- Conversion tracking
- Real-time monitoring

**Additional analytics:**

- Vercel Analytics (built-in)
- Vercel Speed Insights (performance monitoring)

## Google Analytics Setup

### Create GA4 Property

**Steps:**

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" (gear icon)
3. Click "Create Property"
4. Enter property details:
   - Property name: "Portfolio Website"
   - Time zone: Your timezone
   - Currency: Your currency
5. Click "Next"
6. Fill business information
7. Click "Create"
8. Accept terms
9. Copy Measurement ID (format: `G-XXXXXXXXXX`)

### Configure Data Streams

1. Click "Data Streams"
2. Click "Add stream" → "Web"
3. Enter website URL
4. Enter stream name
5. Click "Create stream"
6. Copy Measurement ID

### Add to Environment Variables

```bash
# .env
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

## Google Tag Manager Setup

### Create GTM Account

**Steps:**

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Click "Create Account"
3. Enter account name (your name/company)
4. Enter container name (your website domain)
5. Select "Web" as target platform
6. Click "Create"
7. Accept terms
8. Copy Container ID (format: `GTM-XXXXXXX`)

### Add to Environment Variables

```bash
# .env
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"
```

### Install GTM Container Code

The code is automatically installed via the Analytics component.

## Implementation

All analytics are **gated behind GDPR cookie consent**. Scripts only load after the user explicitly accepts via the cookie banner. See [Consent System](../../02-features/16-consent-system.md) for full details.

### Analytics Component

**File:** `components/meta/analytics.tsx`

```typescript
'use client'

import { analyticsConfig, appConfig } from '@/lib/config';
import { useConsent } from '@/components/consent/ConsentProvider';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export function Analytics() {
  const { consent } = useConsent();

  // Only load after explicit user consent
  if (consent !== 'accepted') return null;
  if (!analyticsConfig.gaId || !analyticsConfig.gtmId || appConfig.isDevelopment) return null;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.gaId}`} />
      <script dangerouslySetInnerHTML={{ __html: `...gtag config...` }} />
      <script dangerouslySetInnerHTML={{ __html: `...GTM loader...` }} />
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}
```

### Layout Integration

```typescript
// app/layout.tsx
import { ConsentProvider } from '@/components/consent/ConsentProvider';
import { CookieBanner } from '@/components/consent/CookieBanner';
import Analytics from '@/components/meta/analytics';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* google-site-verification is in the static metadata object, not the Analytics component */}
      </head>
      <body>
        <ConsentProvider>
          <Analytics /> {/* renders nothing until consent === 'accepted' */}
          <ThemeProvider>
            {children}
            <CookieBanner /> {/* shown until user decides */}
          </ThemeProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
```
```

### Configuration

```typescript
// lib/config.ts
export const analyticsConfig = {
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
};

export const appConfig = {
  environment: process.env.NODE_ENV || "development",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
};
```

## Event Tracking

### Custom Events

**Track button clicks:**

```typescript
// components/download-button.tsx
'use client';

export function DownloadButton() {
  const handleDownload = () => {
    // Track with Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'download', {
        event_category: 'engagement',
        event_label: 'resume',
        value: 1,
      });
    }

    // Download logic
    window.location.href = '/download/resume.pdf';
  };

  return <Button onClick={handleDownload}>Download Resume</Button>;
}
```

**Track external links:**

```typescript
// components/external-link.tsx
'use client';

export function ExternalLink({ href, children }) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'outbound',
        event_label: href,
        transport_type: 'beacon',
      });
    }
  };

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
      {children}
    </a>
  );
}
```

### GTM Custom Events

**Using Data Layer:**

```typescript
'use client';

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Push event to GTM Data Layer
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'form_submission',
        formName: 'contact_form',
        formId: 'contact',
      });
    }

    // Form submission logic
  };

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

**TypeScript declarations:**

```typescript
// global.d.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export {};
```

### Common Events to Track

**1. Page views** (automatic with GA4)

**2. Downloads:**

```typescript
gtag("event", "file_download", {
  file_name: "resume.pdf",
  file_extension: "pdf",
  link_url: "/download/resume.pdf",
});
```

**3. Outbound clicks:**

```typescript
gtag("event", "click", {
  event_category: "outbound",
  event_label: "https://github.com/username",
});
```

**4. Project views:**

```typescript
gtag("event", "view_item", {
  item_id: project.slug,
  item_name: project.title,
  item_category: "project",
});
```

**5. Social clicks:**

```typescript
gtag("event", "social_click", {
  platform: "linkedin",
  url: "https://linkedin.com/in/username",
});
```

## Privacy Considerations

### GDPR Compliance

The site is fully compliant with the EU ePrivacy Directive and GDPR for analytics:

1. **Consent-first**: analytics scripts never load until the user clicks Accept
2. **Cookie banner**: `components/consent/CookieBanner.tsx` — fixed bottom bar with equal-prominence Accept/Decline buttons
3. **Persistent preference**: consent stored in `localStorage` (`cookie-consent: 'accepted' | 'declined'`)
4. **Revocable**: "Cookie Settings" link in the footer resets consent so the banner reappears
5. **Privacy policy**: `/privacy` page covers data controller, cookie table, legal basis, retention, GDPR rights

**See:** [Privacy & Compliance Guide](../07-privacy-compliance.md)

### Consent State

```typescript
// Three possible states
type ConsentState = 'accepted' | 'declined' | null  // null = no decision yet

// From useConsent() hook
const { consent, accept, decline, reset } = useConsent();
```

### Anonymize IP Addresses

GA4 anonymizes IPs automatically. To be explicit:

```typescript
gtag("config", analyticsConfig.gaId, {
  anonymize_ip: true,
});
```

## Testing

### Test in Development

**1. Enable in development (temporarily):**

```typescript
// components/meta/analytics.tsx
export function Analytics() {
  // Remove isDevelopment check for testing
  if (!analyticsConfig.gaId || !analyticsConfig.gtmId) {
    return null;
  }

  // Rest of code...
}
```

**2. Check browser console:**

```javascript
// Open DevTools → Console
console.log(window.gtag);
console.log(window.dataLayer);
```

### Test with GA Debugger

**Chrome Extension:**

1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger)
2. Enable extension
3. Visit your site
4. Check console for GA debug messages

### Test with GTM Preview

**Steps:**

1. Go to Google Tag Manager
2. Click "Preview"
3. Enter your website URL
4. Click "Connect"
5. Interact with your site
6. Check which tags fire

### Test in Production

**Real-time reports:**

1. Go to Google Analytics
2. Click "Reports" → "Realtime"
3. Visit your site in another tab
4. Check if visit appears

## Common Issues

### Issue: Analytics not loading

**Check:**

1. Environment variables set correctly
2. Not in development mode
3. Ad blocker disabled
4. Console for errors

### Issue: Events not tracking

**Check:**

1. `gtag` function exists
2. Event name and parameters correct
3. GTM tags configured properly
4. Check GA4 DebugView

## See Also

- [SEO Guide](./01-seo-guide.md) - Complete SEO implementation
- [Performance](./05-performance.md) - Performance optimization
- [Configuration](../utilities/02-config-library.md) - Environment variables

## Next Steps

- Create GA4 property
- Create GTM container
- Add IDs to environment variables
- Test analytics tracking
- Set up custom events
- Monitor analytics reports

---

**Last Updated:** February 2026  
**Maintainers:** Simon Stijnen  
**Questions?** Open an issue on GitHub
