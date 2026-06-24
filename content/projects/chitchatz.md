---
title: "ChitChatz"
shortDescription: "A websocket based messaging application with a focus on real-time communication."
technologies: ["WebSocket", "TypeScript", "Docker", "Node.js", "JWT", "JQuery", "Cookies"]
images:
  - src: /images/projects/chitchatz/demo-room.webp
    alt: "ChitChatz chat interface showing real-time messaging between users"
  - src: /images/projects/chitchatz/enter-username.webp
    alt: "Users that are not logged in get a username prompt to fill in a username. This is then store in the JWT token provided by the server."
  - src: /images/projects/chitchatz/user-not-in-room.webp
    alt: "Once a user is logged in he gets to see the available rooms at the left of the screen. Together with the option to create a room for himself."
  - src: /images/projects/chitchatz/user-in-room.webp
    alt: "Once a user has joined the room by clicking it, he can start chatting!"
  - src: /images/projects/chitchatz/debug-information.webp
    alt: "Because this project was all about JWT tokens, a user can view his JWT token in this popup."
githubUrl: "https://github.com/SimonStnn/MLX90640"
---

ChitChatz is a real-time messaging application built around **WebSockets**, exploring how stateless authentication with **JWT** tokens can be combined with persistent, bidirectional connections to deliver a snappy chat experience without polling.

## How It Works

When a user first opens the app they are prompted to choose a username. The **Node.js** server mints a signed JWT containing that identity and sends it back; the browser stores it in a **cookie** for the duration of the session. Every subsequent WebSocket message carries this token, so the server can identify the sender without maintaining its own session store.

Users can browse available chat rooms, create their own, and join any room to start messaging — all updates arrive instantly over the open WebSocket connection.

## Key Features

- **Persistent WebSocket connections** managed server-side in Node.js, broadcasting messages only to members of the relevant room
- **JWT-based authentication** — stateless by design, with token inspection available via an in-app debug panel for learning purposes
- Cookie-based session persistence so users survive a page refresh without re-entering their username
- Room creation and switching without reconnecting — the same socket handles multiple room contexts
- **TypeScript** throughout both server and client, with **jQuery** powering the frontend DOM interactions

## Technical Highlights

- The debug panel exposing the raw decoded JWT payload was an intentional teaching tool, making the token's structure and claims tangible
- **Docker** containerises the Node.js server, keeping the runtime environment reproducible and the deployment a single `docker run` away
- Keeping auth stateless means the server holds no session table — scaling out is a matter of adding instances behind a load balancer
