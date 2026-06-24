---
title: "Pop-a-loon"
shortDescription: "A full stack Chrome extension with 200+ users, featuring interactive balloons and real-time stats."
technologies:
  [
    "React",
    "Next.js",
    "Tailwind CSS",
    "MongoDB",
    "REST API",
    "Chrome Extensions",
    "TypeScript",
    "Docker",
  ]
images:
  - src: /images/projects/pop-a-loon/small.webp
    alt: "Pop-a-loon Chrome extension icon showing colorful balloons"
  - src: /images/projects/pop-a-loon/screenshot-1.webp
    alt: "Pop-a-loon extension interface with floating balloons on a webpage"
  - src: /images/projects/pop-a-loon/screenshot-2.webp
    alt: "User statistics dashboard showing popped balloons count and global leaderboard"
  - src: /images/projects/pop-a-loon/screenshot-3.webp
    alt: "Pop-history graph displaying user's balloon popping activity over time"
demoUrl: "https://chromewebstore.google.com/detail/pop-a-loon/pahcoancbdjmffpmfbnjablnabomdocp"
githubUrl: "https://github.com/SimonStnn/pop-a-loon"
order: 2
---

**Pop-a-loon** is a full-stack **Chrome extension** that injects playful, interactive balloons into any webpage, turning ordinary browsing into a light-hearted game. With **200+ active users** on the Chrome Web Store, it demonstrates end-to-end ownership from browser API integration to cloud-backed persistence.

## How It Works

When installed, the extension periodically spawns balloons that float across the current tab. Clicking one pops it with satisfying feedback and records the event against the user's account. A popup panel surfaces personal stats alongside a **global leaderboard**, fostering a small competitive community entirely within the browser.

## Key Features

- Randomised balloon spawning driven by configurable **Chrome Extensions** content scripts
- Real-time stat tracking persisted in **MongoDB** via a **REST API** backend
- Global leaderboard and a **pop-history graph** visualising activity over time
- User accounts with cross-device score synchronisation
- Settings panel built with **React** and **Tailwind CSS**, bundled for the extension environment

## Technical Highlights

The backend is a **Next.js** application deployed in a **Docker** container, exposing a typed **REST API** consumed by both the extension popup and the leaderboard page. The entire codebase is written in **TypeScript**, providing strict typing across the Chrome content scripts, the React UI, and the API route handlers. **MongoDB** stores user records and pop events, with aggregation pipelines powering the leaderboard queries. Keeping the extension lightweight while coordinating with a live backend required careful attention to Chrome's service-worker lifecycle and message-passing model — a practical exercise in building resilient, event-driven browser software.
