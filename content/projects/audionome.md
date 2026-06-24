---
title: "Audionome: Music Genre Classification"
shortDescription: "Using a Support Vector Machine (SVM) to classify music clips based on their genre."
technologies: ["AI", "SVM", "Streamlit", "Python", "Pandas", "NumPy", "Librosa", "Scikit-learn"]
images:
  - src: /images/projects/audionome/preview.jpg
    alt: "Audionome application interface showing music genre classification"
  - src: /images/projects/audionome/quick-demo.webp
    alt: "Demo screenshot of Audionome classifying a music track with SVM model results"
demoUrl: "https://audionome.streamlit.app/"
githubUrl: "https://github.com/SimonStnn/Audionome"
---

Audionome is an AI-powered music genre classifier built for the Machine Learning course at VIVES University of Applied Sciences. Upload an audio clip and the app predicts its genre in seconds — no music theory knowledge required.

## What I Built

Working with a teammate, I trained and compared several **Scikit-learn** classifiers — including logistic regression, SGD, and **Support Vector Machine (SVM)** — to find the best-performing model for genre prediction. The SVM classifier came out on top and became the foundation of the final application. The entire pipeline runs inside a **Streamlit** web app, making it accessible to anyone with a browser.

## Audio Feature Extraction

Raw audio files are not fed directly into the model. Instead, **Librosa** extracts a compact set of meaningful features from each clip:

- **MFCCs** (Mel-frequency cepstral coefficients) — capture the overall timbral texture of the track
- Spectral centroid and bandwidth — describe where the energy sits in the frequency spectrum
- Zero-crossing rate — a simple but effective proxy for percussiveness and noise
- Chroma features — encode harmonic and melodic content

**Pandas** and **NumPy** handle feature aggregation and normalization before the data reaches the classifier.

## Key Features

- Upload any audio clip and receive an instant genre prediction with confidence scores
- Model comparison — multiple classifiers were evaluated on the same feature set so results are evidence-based
- Fully interactive **Streamlit** UI — no installation needed, runs at [audionome.streamlit.app](https://audionome.streamlit.app/)
- Clean data pipeline from raw audio through feature extraction to classification output

This project gave me hands-on experience with the full **machine learning workflow**: feature engineering, model selection, evaluation, and deployment.
