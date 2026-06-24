---
title: "Signapse"
shortDescription: "Using computer vision and machine learning to translate sign language gestures into text."
technologies:
  [
    "AI",
    "Python",
    "Kubernetes",
    "PyTorch",
    "React Native",
    "CI/CD",
    "FastAPI",
    "Docker",
    "TypeScript",
  ]
images:
  - src: /images/projects/signapse/stack.webp
    alt: "While presenting the tech stack used in the Signapse project."
  - src: /images/projects/signapse/demo.webp
    alt: "The demo of the Signapse application in action at VIVES."
  - src: /images/projects/signapse/tablet-home-1-2527x1422.webp
    alt: "Signapse application home page."
githubUrl: "https://github.com/vives-project-xp/Signapse"
order: 1
---

Signapse is an accessibility application built during **VIVES Project Experience** that closes the communication gap between deaf or hard-of-hearing individuals and hearing people. It uses the phone's camera to recognise sign language gestures in real time and converts them to text and synthesised speech — no interpreter required.

## AI Pipeline

The core intelligence is a **multi-model pipeline** that combines two complementary techniques:

- **MediaPipe** extracts hand and body-pose landmarks from each video frame, producing structured spatial data rather than raw pixels
- A **PyTorch LSTM** network analyses sequences of those landmarks to classify gestures over time, capturing the motion patterns that distinguish one sign from another
- The pipeline supports both **ASL** (American Sign Language) and **VGT** (Flemish Sign Language), recognising individual letters and full words

The landmark extraction and classification logic is packaged as `smart_gestures`, a standalone **Python** library published on **PyPI**, making it reusable across all system components.

## Architecture

Signapse is structured as three loosely coupled layers:

- **Mobile frontend** — a **React Native** app written in **TypeScript** that streams camera frames and displays transcription results
- **AI backend** — a **FastAPI** service that receives landmark data, runs inference, and returns predictions with low latency
- **Infrastructure** — containerised with **Docker** and orchestrated on **Kubernetes**, with a **CI/CD** pipeline automating builds and deployments

## What I Built

My contributions spanned model training in **PyTorch**, authoring the `smart_gestures` package, wiring the **FastAPI** inference endpoint, and configuring the Kubernetes manifests. The project sharpened my ability to take a research-grade model from a notebook to a production-ready service that responds fast enough for a real conversation.
