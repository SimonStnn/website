---
title: "Hello, Blog!"
description: "Why I added a blog to my portfolio, and what you can expect to find here — project write-ups, short technical notes, and the occasional opinion."
date: "2026-06-24"
---

## Why a blog?

My portfolio already shows _what_ I've built. A blog is a place to write about _how_ and _why_ — the decisions that don't show up in a README, the things I learned the hard way, and the small experiments that never quite became full projects.

I'll keep posts short and practical. No filler.

## What to expect

Mostly three kinds of posts:

- **Project write-ups** — a deep-dive into something I built, covering the interesting design decisions and what I'd do differently next time.
- **Technical notes** — short posts documenting something I figured out and would want to find again quickly. Think of them as public notes-to-self.
- **Opinions** — occasional takes on tools, workflows, or patterns I find genuinely useful (or genuinely annoying).

## The tech behind this blog

If you're curious: the blog is built with the same stack as the rest of this site — **Next.js 16 App Router**, statically generated at build time from Markdown files in the repository. No database, no CMS. Writing a post means committing a `.md` file and pushing.

The rendering pipeline uses **remark** and **rehype** with `rehype-pretty-code` for syntax highlighting — the same pipeline used for my project pages. An RSS feed is available at [/rss.xml](/rss.xml) if you prefer to follow that way.

---

More posts soon.
