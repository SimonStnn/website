---
title: "CERM MCP PoC"
shortDescription: "A proof of concept email automation agent using Microsoft 365 MCP server and LangChain."
technologies:
  [
    "Python",
    "LangChain",
    "MCP",
    "LLMs",
    "Azure OpenAI",
    "FastAPI",
    "Gradio",
    "Microsoft Graph API",
    "Docker",
  ]
images:
  - src: /images/projects/cerm-mcp-poc/chat.webp
    alt: "Chat interface of the CERM MCP email agent application"
  - src: /images/projects/cerm-mcp-poc/outlook.webp
    alt: "Outlook integration showing email management capabilities"
githubUrl: "https://github.com/SimonStnn/email-agent"
order: 2
---

This proof of concept explores what happens when a **LangChain** agent gains structured access to a full Microsoft 365 account. Rather than screen-scraping or fragile automation, the integration is built on the **Model Context Protocol (MCP)** — a typed tool-calling standard that lets the AI reason about which action to take and then invoke it precisely.

## The MCP Server

The centrepiece is a custom **Microsoft Graph API** MCP server implemented in **Python** and served over HTTP with **FastAPI**. It exposes **51 specialised tools** covering:

- Outlook email — read, compose, reply, search, and organise threads
- Calendar — create, update, and query events across multiple calendars
- OneDrive — list, upload, and retrieve files
- Contacts — look up and manage address book entries

Authentication is handled via **device flow**, supporting both personal and work/school Microsoft accounts. To keep latency low, all Graph API responses are cached with **AES-256** encryption, delivering up to a **300x performance improvement** on repeated queries.

## The Conversational Interface

A **Gradio** chat UI sits in front of a **LangChain** agent backed by **Azure OpenAI**. Users type natural-language requests — "summarise my unread emails from this week" or "block off Friday afternoon" — and the agent selects and chains the appropriate MCP tools to fulfil them. Communication between the Gradio app and the MCP server uses **streamable HTTP**, enabling real-time, bidirectional data flow without polling.

## What This Demonstrates

The project proves that **MCP** is a practical bridge between production enterprise systems and LLM agents — far more reliable than prompt-engineered workarounds. The whole stack runs in **Docker**, making it straightforward to evaluate locally or deploy to a shared environment for demos.
