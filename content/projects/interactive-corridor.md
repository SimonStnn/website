---
title: "Interactive Corridor"
shortDescription: "An immersive, interactive hallway."
technologies: ["Typescript", "MQTT", "IoT", "ESP32", "Node.js", "Vue"]
images:
  - src: /images/projects/interactive-corridor/demo.webp
    alt: "Interactive corridor demonstration showing responsive LED lighting and user interaction"
  - src: /images/projects/interactive-corridor/depth-effect.mp4
    alt: "Video demonstration of depth-sensing effects in the interactive corridor"
  - src: /images/projects/interactive-corridor/sync-ledstrips.mp4
    alt: "Video showing synchronized LED strip lighting effects across the corridor"
  - src: /images/projects/interactive-corridor/working-people-1.webp
    alt: "Development team working on interactive corridor project - hardware installation"
  - src: /images/projects/interactive-corridor/working-people-2.webp
    alt: "Team members programming and testing the interactive corridor systems"
  - src: /images/projects/interactive-corridor/ledstrip-effects.mp4
    alt: "Video showcasing various LED strip lighting patterns and effects in the corridor"
githubUrl: "https://github.com/vives-project-xp/InteractiveCorridor"
order: 5
---

A hallway installation that reacts to the people walking through it — sensors detect movement and depth, and the corridor responds with synchronized lighting effects that follow visitors in real time. Built as a team project of four, I served as the **primary software developer** and designed the full system architecture.

## Architecture

The system is built around a lightweight **publish/subscribe** messaging backbone using **MQTT**. Each **ESP32** microcontroller along the corridor publishes sensor readings to the broker; a central **Node.js** server subscribes to those topics, processes the data, and publishes lighting commands back to the ESP32 nodes. This decoupled design means hardware nodes can be added or removed without changing the server logic.

A **Vue** dashboard running in the browser gives operators a live view of corridor activity and lets them adjust lighting scenes and effect parameters without touching the firmware.

## Key Features

- Real-time depth sensing — presence and proximity are tracked continuously along the full length of the corridor
- Synchronized LED strips — multiple strips animate in tight coordination, producing smooth wave and chase effects
- Custom MQTT API — a structured topic hierarchy separates sensor data, control commands, and status reporting
- Live operator dashboard — built with **Vue** and **TypeScript**, showing sensor states and allowing scene selection
- Permanent installation — the system has been running reliably in a public-facing environment since deployment

## Technical Highlights

- Developed algorithms to translate raw sensor readings into smooth, latency-tolerant lighting transitions
- Managed message ordering and timing across multiple ESP32 nodes to prevent visible desync between LED strips
- Used **TypeScript** throughout the Node.js server for type-safe MQTT message parsing and command dispatch

The project is now permanently installed and continues to delight every visitor who walks through it.
