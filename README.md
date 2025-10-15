# 🌌 Planex

**Planex** is an AI-powered exoplanet detection platform built during a
**30-hour hackathon** as part of the
**[NASA Space Apps Challenge 2025](https://www.spaceappschallenge.org/2025/challenges/a-world-away-hunting-for-exoplanets-with-ai/)**.

It leverages NASA's open-source **Kepler**, **K2**, and **TESS** datasets to
automatically identify potential exoplanets using machine learning.

## 🚀 Features

- 🪐 **AI/ML Model:** Trained on NASA's Kepler, K2, and TESS datasets to
  classify exoplanet candidates.
- 💡 **Automatic Classification:** Identifies data points as
  _Confirmed Exoplanets_, _Candidates_, or _False Positives_.
- 🌐 **Interactive Interface:** Users can upload new datasets and view
  predictions in real-time.
- ⚡ **FastAPI Backend:** Efficient inference and preprocessing for large-scale
  astronomical data.
- 🛰️ **Built in 30 Hours:** Developed end-to-end during a 30-hour hackathon
  event.

## 🧠 How It Works

1. **Dataset Input:** NASA's open-source Kepler, K2, and TESS mission data are
   used for training and testing.
2. **Preprocessing:** The backend cleans, scales, and prepares transit and
   orbital data.
3. **Model Inference:** The trained model predicts whether each observation
   corresponds to a real exoplanet.
4. **Visualization:** The frontend displays prediction confidence levels and
   categorized results.

## 🧩 Tech Stack

**Frontend:**

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [ShadCN UI](https://ui.shadcn.com)
- [Tanstack Query](https://tanstack.com/query)

**Backend:**

👉 Backend source code: [github.com/Fr33b13101/planex](https://github.com/Fr33b13101/planex)
