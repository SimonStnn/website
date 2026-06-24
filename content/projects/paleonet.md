---
title: "PaleoNet"
shortDescription: "Using a convolutional neural network (CNN) to classify images of dinosaurs."
technologies: ["AI", "CNN", "TensorFlow", "Streamlit", "Keras", "Python", "NumPy", "Pandas"]
images:
  - src: /images/projects/paleonet/preview.jpg
    alt: "PaleoNet application interface showing dinosaur image classification results"
  - src: /images/projects/paleonet/quick-demo.webp
    alt: "Demo of PaleoNet classifying a dinosaur image with CNN model predictions"
  - src: /images/projects/paleonet/training.webp
    alt: "Training progress visualization showing model accuracy and loss curves over epochs"
  - src: /images/projects/paleonet/performance.webp
    alt: "Model performance metrics including accuracy, precision, recall, and confusion matrix"
demoUrl: "https://paleonet.streamlit.app/"
githubUrl: "https://github.com/SimonStnn/PaleoNet"
---

A machine learning assignment that grew into a genuine deep learning challenge: train a **convolutional neural network** to automatically identify dinosaur species from images, starting with a target accuracy of 70% and pushing it further through systematic experimentation.

## What I Built

PaleoNet is an end-to-end image classification pipeline built with **TensorFlow** and **Keras**, from raw dataset preparation through to a live interactive demo deployed on **Streamlit**. The model takes an input image and returns a ranked list of predicted dinosaur species with confidence scores.

## Technical Highlights

- Designed and iterated on multiple **CNN architectures**, tuning depth, filter sizes, and pooling strategies to find what generalised best on the limited dataset
- Applied **data augmentation** techniques — random flips, rotations, and zoom — to artificially expand training variety and reduce overfitting
- Used **NumPy** and **Pandas** for dataset wrangling, label encoding, and tracking per-epoch metrics across experiments
- Achieved a final classification accuracy of just above **80%**, exceeding the initial 70% target

## Architecture

The training pipeline preprocesses images to a fixed resolution, passes them through stacked convolutional and max-pooling blocks, and feeds the flattened output into a dense classifier head with dropout regularisation. Training progress — loss and accuracy curves — was logged each run, making it straightforward to compare the effect of each architectural change.

The finished model is served through a **Streamlit** web app, where anyone can upload an image and receive a live prediction.
