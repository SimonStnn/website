---
title: "MyBot"
shortDescription: "My first big solo project. A discord bot."
technologies: ["Node.js", "TypeScript", "Docker", "MongoDB"]
images: []
githubUrl: "https://github.com/SimonStnn/MyBot"
---

MyBot was my first large solo software project — a fully self-hosted **Discord** bot built to bring games, moderation utilities, and community tools into a single package. It marked the point where I moved from tutorial exercises to designing and shipping something real.

## Key Features

- **Dynamic help command** that introspects every registered command and auto-generates formatted documentation, so the help text never goes stale
- **Don't-Break-the-Chain** — a community word-chain game where players must keep repeating the same word in sequence; the bot tracks the current streak length, records when and who breaks it, and awards points accordingly
- Persistent **user points system** backed by **MongoDB**, storing game state and scores across bot restarts
- Modular command architecture making it straightforward to add new commands without touching existing ones

## Technical Highlights

The bot is written in **TypeScript** on top of **Node.js**, which pushed me to think carefully about types and interfaces from the start. Wrapping the application in a **Docker** container simplified deployment and meant the bot could be reliably restarted or migrated without environment friction.

**MongoDB** stores all persistent data — user scores, chain records, and configuration — giving the bot a proper data layer rather than relying on in-memory state. Building this project taught me the full lifecycle of a networked application: API integration, stateful data design, containerisation, and keeping a service running reliably over time.
