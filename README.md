
# Quiz Generator Platform 📚⚡️

AI‑powered web app that converts academic documents (PDF, PPT, DOCX) into balanced, bias‑checked quizzes using **Azure OpenAI GPT‑4o**.  
Built with **FastAPI**, **React**, and a fully containerised Azure DevOps pipeline.

---

## ✨ Key Features
| Capability | Description |
|------------|-------------|
| 🔍 Intelligent indexing | Azure AI Search extracts semantic chunks & key phrases |
| 🧠 GPT‑4o quiz engine | Rule‑based prompts ensure difficulty balance & no leakage |
| 🔄 Question regeneration | Regenerate single items with user feedback |
| 💾 Blob storage | Secure, tiered document & quiz storage |
| ⚙️ CI / CD | Docker‑based pipeline → ACR → App Service |
| 💰 Cost control | Nightly scale‑down, on‑demand search resources |

---

## 🖼️ Architecture

```
React SPA  ←─►  FastAPI (Uvicorn)  ──►  Azure AI Search
                 ││                       ▲
                 ▼▼                       │
             Blob Storage  ◄──────────────┘
                 │
          Key Vault (secrets)
```

---

## 🛠 Tech Stack
| Layer | Tech |
|-------|------|
| Front‑end | React 18 + Fluent UI |
| API | FastAPI / Python 3.11 |
| AI | Azure OpenAI GPT‑4o |
| Search | Azure Cognitive Search |
| Data | Azure SQL DB |
| Storage | Azure Blob Storage |
| Containers | Docker + ACR |
| CI / CD | Azure DevOps Pipelines |
| IaC | Bicep templates |

---

## 🚀 Local Setup

```bash
# 1. clone
git clone https://github.com/your‑org/quiz‑generator.git
cd quiz‑generator

# 2. backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill Azure creds
uvicorn app.main:app --reload

# 3. frontend
cd ../frontend
cp .env.development.local.example .env
npm ci
npm start
```

---

## 🔒 Environment Variables

| Name | Purpose |
|------|---------|
| `AZURE_OPENAI_ENDPOINT` | your OpenAI resource URL |
| `AZURE_OPENAI_API_KEY` | key / or Key‑Vault ref |
| `AZURE_SEARCH_NAME` | search service name |
| … | … |

---

## 🏗️ CI / CD

* **CI** – pull‑request pipeline lints, tests, builds Docker images.  
* **CD** – manual trigger builds latest tags, pushes to **ACR**, then deploys to two App Service containers (API & SPA).  
* Bicep template provisions ACR, Search, SQL, Key Vault and pipelines.

---

## 💸 Cost Management

* **Always‑On off** – API sleeps after 20 min idle.  
* Search indexes created on‑demand then deleted.  
* Dev slots scaled to **B1 / F1** out‑of‑hours.  
* Azure Monitor + budget alerts.
