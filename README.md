<div align="center">
  <img src="https://img.shields.io/badge/Model-Qwen2.5--1.5B-blue?style=for-the-badge&logo=huggingface&logoColor=white" alt="Qwen2.5 1.5B" />
  <img src="https://img.shields.io/badge/Fine--Tuning-LoRA%20%7C%20PEFT-purple?style=for-the-badge&logo=pytorch&logoColor=white" alt="LoRA PEFT" />
  <img src="https://img.shields.io/badge/Framework-LLaMAFactory-orange?style=for-the-badge" alt="LLaMAFactory" />
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Frontend-React%20%7C%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Vite" />
  <img src="https://img.shields.io/badge/Containerized-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</div>

<br />

<div align="center">
  <h1>📰 Arabic News Summarization LLM</h1>
  <p>An end-to-end AI platform for abstractive and extractive Arabic news summarization. Built by fine-tuning the Qwen 1.5B language model using Parameter-Efficient Fine-Tuning (LoRA) and wrapped in a modern, production-ready Full-Stack application.</p>
</div>

---

## 📖 Project Overview

The **Arabic News Summarization LLM** is a full-stack AI application designed to distill lengthy Arabic news articles into concise, highly accurate bullet points. It bridges the gap between deep learning research and practical software engineering by offering a complete pipeline: from data generation and fine-tuning an LLM, to serving the model via a RESTful API, and providing a modern React-based UI for end users.

This project was built to address the complexities of the Arabic language (RTL layout, morphological richness) and features a dual-engine summarization approach:
1. **AI Abstractive Summarization:** Powered by a custom-trained LoRA adapter over `Qwen2.5-1.5B-Instruct`.
2. **Zero-Dependency Extractive Summarization:** A pure Python TF-IDF fallback algorithm that guarantees 100% offline availability in environments with strict network limitations.

---

## ✨ Key Features

- **Custom Arabic LLM Fine-Tuning:** Fine-tuned `Qwen/Qwen2.5-1.5B-Instruct` using `LLaMAFactory` and LoRA (r=64) to strictly output structured JSON summaries.
- **RESTful Inference Backend:** A highly scalable FastAPI backend serving the model using `torch.inference_mode` with Pydantic for data validation.
- **Modern RTL Frontend:** A beautiful, responsive React frontend powered by Vite, Tailwind CSS v4, and Arabic typography (`Cairo` / `Tajawal` fonts).
- **Dual Inference Engine:** 
  - Standard mode: Utilizes PyTorch & Transformers for deep LLM inference.
  - Fallback mode: Utilizes a custom, lightweight Python Extractive Summarizer algorithm for environments where downloading 3GB LLMs is impossible.
- **Containerization:** Fully dockerized with `docker-compose` for seamless, 1-click deployments across any environment.
- **Load Tested & Optimized:** Evaluated using `Locust` and `vLLM` to handle high-throughput concurrent requests.

---

## 🛠️ Technology Stack

### Artificial Intelligence & Machine Learning
- **Base Model:** `Qwen/Qwen2.5-1.5B-Instruct`
- **Training Framework:** `LLaMAFactory`, `Transformers`, `PEFT`
- **Techniques:** LoRA (Parameter-Efficient Fine Tuning), Half-Precision (`fp16`)
- **Inference Server:** `vLLM` (for Colab/Cloud hosting), `PyTorch` (for local hosting)

### Backend Engineering
- **Framework:** `FastAPI` (Python)
- **Server:** `Uvicorn`
- **Data Validation:** `Pydantic`
- **Resilience:** `json-repair` (to handle LLM hallucinated JSON tokens)

### Frontend Development
- **Framework:** `React 19` + `TypeScript`
- **Build Tool:** `Vite`
- **Styling:** `Tailwind CSS v4`
- **Icons:** `lucide-react`

### DevOps & Tooling
- **Containerization:** `Docker`, `Docker Compose`
- **API Tunneling:** `Ngrok`
- **Load Testing:** `Locust`

---

## 🔬 The AI Training Pipeline

### 1. Data Preparation
The dataset was synthetically generated and formatted using the `Faker` library (for Arabic text simulation) and structured into system/user/assistant conversational pairs. The goal was to force the LLM to output summaries strictly in a predefined JSON format matching a Pydantic schema: `{"story_summary": ["point 1", "point 2"]}`.

### 2. Fine-Tuning with LLaMAFactory
The model was fine-tuned on Google Colab using **LLaMAFactory**, which abstracts away the complexities of distributed training. 
- **Method:** LoRA (Low-Rank Adaptation)
- **Target Modules:** Q/K/V Attention projections
- **LoRA Rank (r):** 64
- **LoRA Alpha:** 16
- **Precision:** fp16 (Half-precision to fit into standard GPU VRAM)

### 3. vLLM Evaluation & Deployment
Post-training, the model was evaluated using **vLLM** (`vllm serve`) to maximize inference throughput. The endpoint was exposed to the public internet using `Ngrok` and load-tested using `Locust` with simulated concurrent users.

---

## 🚀 Installation & Local Setup

### Option 1: Docker (Recommended)
The easiest way to run the entire stack (Frontend + Backend).

1. Ensure **Docker Desktop** is running.
2. Clone the repository and navigate to the root directory.
3. Run the following command:
   ```bash
   docker compose up --build
   ```
4. Access the web interface at `http://localhost:5173`.
5. Access the API Documentation at `http://localhost:8000/docs`.

### Option 2: Manual Local Setup (Without Docker)

**Backend Setup:**
```bash
cd backend
python -m venv venv
# Windows: .\venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

**Frontend Setup:**
```bash
cd frontend
npm install
npm run dev
```

---

## 🔌 API Reference

The backend provides a clean REST API interface accessible at `http://localhost:8000`.

### Health Check
```http
GET /api/health
```
**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

### Summarize Text
```http
POST /api/summarize
```
**Request Body:**
```json
{
  "article": "أعلنت شركة أبل عن إطلاق الجيل الجديد من هواتف آيفون في مؤتمرها السنوي. الهاتف الجديد يتميز بمعالج أسرع..."
}
```
**Response:**
```json
{
  "summary": [
    "إطلاق الجيل الجديد من هواتف آيفون.",
    "الهاتف يتميز بمعالج أسرع بنسبة 30% وكاميرا متطورة."
  ]
}
```
<img width="1776" height="835" alt="Screenshot 2026-09-14 134913" src="https://github.com/user-attachments/assets/e826bd75-151c-4cd1-934d-3fb9a8bd6b7c" />

<img width="1224" height="828" alt="image" src="https://github.com/user-attachments/assets/525c1241-e4ed-4a89-ad4e-ab534fda0ed9" />

<img width="925" height="713" alt="Screenshot 2026-09-14 135041" src="https://github.com/user-attachments/assets/1ee0ab34-b5ad-4af1-a4dc-65cfbac4a621" />

---
