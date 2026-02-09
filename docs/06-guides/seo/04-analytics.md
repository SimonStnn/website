# Google Analytics & Google Tag Manager

**Breadcrumbs:** [Documentation](../../README.md) > [Guides](../README.md) > [SEO](./README.md) > Analytics

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

### Analytics Component

**File:** `components/meta/analytics.tsx`

```typescript
// components/meta/analytics.tsx
import { analyticsConfig, appConfig } from '@/lib/config';

export function Analytics() {
  // Don't render in development
  if (!analyticsConfig.gaId || !analyticsConfig.gtmId || appConfig.isDevelopment) {
    return null;
  }

  return (
    <>
      {/* Google Site Verification */}
      <meta name="google-site-verification" content="your-verification-code" />

      {/* Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.gaId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${analyticsConfig.gaId}');
          `,
        }}
      />

      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${analyticsConfig.gtmId}');
          `,
        }}
      />
    </>
  );
}
```

### Layout Integration

```typescript
// app/layout.tsx
import Analytics from '@/components/meta/analytics';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />
      </head>
      <body>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${analyticsConfig.gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
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

**If targeting EU users, consider:**

1. **Cookie consent banner**
2. **Privacy policy page**
3. **Data processing agreement**
4. **User opt-out option**

### Cookie Consent

**Basic implementation:**

```typescript
'use client';

import { useState, useEffect } from 'react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);

    // Initialize analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <p>We use cookies to improve your experience.</p>
        <Button onClick={acceptCookies}>Accept</Button>
      </div>
    </div>
  );
}
```

### Anonymize IP Addresses

**GA4 (automatic in GA4):**

```typescript
gtag("config", analyticsConfig.gaId, {
  anonymize_ip: true,
});
```

### Opt-Out

**Provide opt-out option:**

```typescript
'use client';

export function OptOutButton() {
  const handleOptOut = () => {
    // Disable Google Analytics
    if (typeof window !== 'undefined') {
      window[`ga-disable-${analyticsConfig.gaId}`] = true;
      localStorage.setItem('analytics-opt-out', 'true');
      alert('Analytics disabled');
    }
  };

  return <Button onClick={handleOptOut}>Opt Out of Analytics</Button>;
}
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
