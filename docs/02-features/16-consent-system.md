# Consent System

**Navigation:** [Home](../index.md) → [Features & Components](./01-components-overview.md) → Consent System

The consent system implements GDPR and ePrivacy Directive compliance for all analytics. No tracking scripts load until the user explicitly accepts via the cookie banner.

## Table of Contents

- [Architecture](#architecture)
- [ConsentProvider](#consentprovider)
- [CookieBanner](#cookiebanner)
- [CookieSettingsButton](#cookiesettingsbutton)
- [Analytics Integration](#analytics-integration)
- [How Consent Flows](#how-consent-flows)

## Architecture

```
ConsentProvider (wraps entire app in layout.tsx)
├── Analytics          ← renders scripts only when consent === 'accepted'
├── ThemeProvider
│   └── ...pages
│       └── CookieBanner   ← visible only when consent === null
└── Footer
    └── CookieSettingsButton  ← resets consent to re-show banner
```

Consent state is stored in `localStorage` under the key `cookie-consent`. Using `localStorage` (not a cookie) means the consent mechanism itself doesn't require consent.

## ConsentProvider

**File:** `components/consent/ConsentProvider.tsx`

```typescript
type ConsentState = "accepted" | "declined" | null;

const { consent, accept, decline, reset } = useConsent();
```

| Value        | Meaning                             |
| ------------ | ----------------------------------- |
| `null`       | No decision yet — banner is visible |
| `'accepted'` | User accepted — analytics load      |
| `'declined'` | User declined — analytics blocked   |

**Reads** `localStorage` on mount (client-side only, safe for SSR). **Writes** on every `accept()`, `decline()`, or `reset()` call.

## CookieBanner

**File:** `components/consent/CookieBanner.tsx`

Fixed bottom bar, only renders when `consent === null`. Styled with existing Tailwind design tokens.

- **Decline** button (outline): calls `decline()`, banner disappears, analytics stay blocked
- **Accept** button (primary): calls `accept()`, banner disappears, analytics load immediately
- Links to `/privacy` for the full privacy policy

## CookieSettingsButton

**File:** `components/consent/CookieSettingsButton.tsx`

Placed in the footer's Navigate section. Calls `reset()`, which sets consent back to `null` and causes the banner to reappear, allowing the user to change their preference.

## Analytics Integration

**File:** `components/meta/analytics.tsx`

The `Analytics` component is a `'use client'` component that reads `useConsent()` and returns `null` unless `consent === 'accepted'`. When accepted, it renders:

- Google Analytics 4 (`gtag.js`)
- Google Tag Manager
- Vercel Analytics
- Vercel Speed Insights

Because it returns `null` on the server (SSR) and during initial hydration, **no tracking scripts are ever sent in the HTML** before the user decides.

## How Consent Flows

```
User visits site
      │
      ▼
ConsentProvider reads localStorage
      │
      ├── 'accepted' → Analytics renders scripts immediately
      ├── 'declined' → Analytics returns null (no scripts)
      └── null ──────→ CookieBanner appears
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
                 Accept              Decline
                    │                   │
            analytics load        analytics stay
            banner hides          blocked, banner hides
                    │                   │
              localStorage        localStorage
              'accepted'          'declined'
```

---

**Last Updated:** July 2025
**Related Docs:** [Analytics Guide](../06-guides/seo/04-analytics.md) | [Privacy & Compliance](../06-guides/07-privacy-compliance.md) | [Meta Components](./15-meta-components.md)
