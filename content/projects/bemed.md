---
title: "BEMED - Zero Waste Montenegro"
shortDescription: "Helping government institutions manage their environmental footprint."
technologies:
  [
    "Project Management",
    "Node.js",
    "TypeScript",
    "REST API",
    "Express.js",
    "Vue",
    "MySQL",
    "Keycloak",
    "Docker",
  ]
images:
  - src: /images/projects/bemed/logo-bemed.webp
    alt: "BEMED project logo - Zero Waste Montenegro environmental management platform"
githubUrl: "https://github.com/SimonStnn/BEMED"
order: 6
---

BEMED is a full-stack web application built to help government institutions in Montenegro track and reduce their consumption of single-use plastics — part of a broader **Zero Waste** initiative supported by the **Erasmus+ Blended Intensive Programme (BIP)**.

## Background

This project was developed in collaboration with international students from **Hogeschool VIVES** (Belgium), **Zealand – Sjællands Erhvervsakademi** (Denmark), and **Hogeschool Inholland** (Netherlands). The programme combined several weeks of remote teamwork with a final in-person sprint at **Universidad Politécnica de Madrid**, making cross-timezone coordination and clear API contracts essential from day one.

## What I Built

The application provides institutions with a structured way to register, categorise, and monitor expenses tied to single-use plastic items. The stack was chosen to keep the backend and frontend decoupled and independently deployable:

- **Express.js** REST API written in **TypeScript**, exposing endpoints for expense registration and reporting
- **Vue** single-page application consuming the API and rendering dashboards for institution staff
- **MySQL** relational database storing expense records, categories, and user accounts
- **Keycloak** handling authentication and role-based access control, keeping auth logic out of application code
- **Docker** Compose setup for consistent local development and straightforward deployment

## Technical Highlights

- Stateless API design with **JWT** tokens issued by Keycloak, enabling easy horizontal scaling
- Role separation between regular staff (data entry) and administrators (reporting and configuration)
- Containerised services mean the entire stack — API, frontend, database, and Keycloak — spins up with a single `docker compose up`
- International collaboration required clear OpenAPI-style documentation so team members across three countries could integrate against the API without constant back-and-forth
