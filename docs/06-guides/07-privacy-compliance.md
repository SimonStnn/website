# Privacy & GDPR Compliance

**Navigation:** [Home](../index.md) → [Guides](./index.md) → Privacy & Compliance

This guide explains the legal framework for analytics on this site and how the consent system satisfies EU requirements.

## Table of Contents

- [Legal Framework](#legal-framework)
- [What Requires Consent](#what-requires-consent)
- [What Is Implemented](#what-is-implemented)
- [Privacy Policy Page](#privacy-policy-page)
- [Updating the Privacy Policy](#updating-the-privacy-policy)
- [Checklist](#checklist)

## Legal Framework

Two EU laws govern analytics on websites:

| Law | Scope | Key Requirement |
|---|---|---|
| **GDPR** | Personal data processing | Lawful basis (consent for analytics) |
| **ePrivacy Directive** | Storing anything on a user's device | Consent before non-essential cookies/tracking |

The ePrivacy Directive applies **even if no personal data is collected**. Analytics cookies are non-essential by definition. Consent must be:
- Freely given (no cookie walls)
- Specific (purpose stated clearly)
- Informed (privacy policy linked)
- Unambiguous (active opt-in — pre-ticked boxes don't count)
- Revocable (as easy to withdraw as to give)

## What Requires Consent

All four analytics tools on this site require consent:

| Tool | Reason |
|---|---|
| Google Analytics 4 | Sets cookies (`_ga`, `_ga_*`, `_gid`), transfers data to Google/US |
| Google Tag Manager | Loads third-party scripts |
| Vercel Analytics | Sends data to Vercel servers (US) |
| Vercel Speed Insights | Sends data to Vercel servers (US) |

## What Is Implemented

- **ConsentProvider** wraps the entire app and tracks consent state (`null / 'accepted' / 'declined'`) in `localStorage`
- **CookieBanner** appears on first visit and shows equal-prominence Accept / Decline buttons
- **Analytics component** is consent-gated: returns `null` until consent is `'accepted'`; scripts are never in the initial HTML
- **CookieSettingsButton** in the footer lets users change their preference at any time
- **Privacy policy** at `/privacy` covers all GDPR-required disclosures

See [Consent System](../02-features/16-consent-system.md) for implementation details.

## Privacy Policy Page

**File:** `app/privacy/page.tsx`

The privacy policy covers:

- Data controller (name, email, country)
- What is collected and why
- Cookies table (`_ga`, `_ga_*`, `_gid`)
- Legal basis (Article 6(1)(a) GDPR — consent)
- Data transfers (Google LLC, EU–US Data Privacy Framework)
- Retention (14 months in GA4)
- User rights (access, erasure, portability, restriction, objection)
- Supervisory authority (Belgian DPA — GBA/APD)

## Updating the Privacy Policy

Update `app/privacy/page.tsx` whenever:

- A new analytics or tracking tool is added
- Data retention settings change
- The data controller's contact details change
- You add a new cookie that persists data

Keep the **Last updated** date current.

## Checklist

Use this when adding any new analytics or third-party script:

- [ ] Does it set cookies or store data on the user's device?
- [ ] Does it transfer data outside the EU?
- [ ] Is it non-essential (site works without it)?

If **any** answer is yes → gate it behind `useConsent()` and add it to the Privacy Policy cookie table.

---

**Last Updated:** July 2025
**Related Docs:** [Consent System](../02-features/16-consent-system.md) | [Analytics Guide](./seo/04-analytics.md)
