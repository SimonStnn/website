---
title: "Final project: Bluetooth Device Localization"
shortDescription: "Locating devices in a room via bluetooth signal strength."
technologies:
  [
    "Python",
    "React",
    "Data Science",
    "Raspberry Pi",
    "ESP32",
    "Bluetooth",
    "WebSocket",
    "IoT",
    "Data Visualization",
    "Data Processing",
    "Trilateration",
  ]
images:
  - src: /images/projects/final-project/website-demo.mp4
    alt: "Starting the application. You can see the bluetooth beacons are discovered automatically. Then we give each beacon a position in the room. Once at least three beacons have a position they can start discovering devices."
  - src: /images/projects/final-project/device-localization-1.mp4
    alt: "Early stages of the project.\nIn the video you see the ESP32 beacons (blue circles) estimating the position of several devices. When clicking a device you see extra information like it's position coordinates in the room."
  - src: /images/projects/final-project/device-localization-2.mp4
    alt: "Early stages of the project.\nDevices with a greater accuracy get rendered on top otherwise you can not interact with them on the map."
  - src: /images/projects/final-project/circles.webp
    alt: "Early stages of the project.\nDevelopment of drawing device circles and implementing trilateration."
githubUrl: "https://github.com/SimonStnn/Eindwerk"
order: 4
---

A real-time indoor positioning system that locates Bluetooth-enabled devices within a room by combining a network of **ESP32** beacons, a **Raspberry Pi** processing hub, and a live **React** dashboard — all without any dedicated indoor-positioning hardware.

## How It Works

A mesh of ESP32 microcontrollers acts as Bluetooth beacons, continuously scanning for nearby devices and capturing their **RSSI** (Received Signal Strength Indicator) readings. Those readings are streamed over **WebSocket** to a Raspberry Pi, which aggregates the data and applies **trilateration** — the same geometric principle used by GPS — to compute each device's estimated (x, y) position within the room.

## Key Features

- Automatic beacon discovery — new ESP32 nodes are detected and added to the map without manual configuration
- Interactive room setup — drag beacons to their physical positions on a 2-D floor plan before positioning begins
- Live device tracking — positions update continuously as signal readings arrive
- Accuracy-aware rendering — devices with higher positional confidence are drawn on top so they remain clickable
- Per-device detail panel — click any tracked device to inspect its computed coordinates and raw signal data

## Technical Highlights

- **Python** backend on the Raspberry Pi handles RSSI aggregation, trilateration math, and WebSocket broadcasting
- React frontend consumes the WebSocket stream and re-renders the canvas on every position update with no full-page refresh
- Trilateration requires a minimum of three beacons with known positions; the UI enforces this before tracking begins
- Signal noise is mitigated with smoothing applied to rolling RSSI windows before feeding values into the positioning algorithm

This project deepened my understanding of **IoT system design**, real-time data pipelines, and the practical challenges of translating raw radio signals into reliable spatial coordinates.
