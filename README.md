# Artificial Curiosity as a Service (ACaaS)

An autonomous investigation system that proactively discovers insights from structured datasets.

**This is NOT a chatbot.** ACaaS observes data, generates hypotheses, asks targeted questions, and produces investigation reports.

## Architecture Overview

```
User (Browser)
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│  Frontend (React + Vite + Tailwind + Recharts)              │
│  Upload CSV → Display questions → Show investigation report │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP / REST
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Backend (FastAPI)                                          │
│  Orchestrates the investigation pipeline:                   │
│                                                             │
│  Observer → Curiosity Engine → Hypothesis Generator         │
│       → Information Seeker → (user answer)                  │
│       → Reasoning Engine → Discovery Engine                 │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
acaas/
├── backend/          # Python FastAPI service
│   ├── app/
│   │   ├── api/      # HTTP route handlers
│   │   ├── core/     # Config, pipeline orchestration
│   │   ├── models/   # Pydantic schemas
│   │   ├── modules/  # Pluggable investigation engines
│   │   └── services/ # File I/O, session state
│   └── requirements.txt
├── frontend/         # React + Vite SPA
│   └── src/
│       ├── api/      # Backend client
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       └── types/
└── README.md
```

## Quick Start

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Investigation Pipeline

1. **Upload** — User uploads a CSV dataset.
2. **Observer** — Analyzes schema, statistics, and distributions.
3. **Curiosity Engine** — Identifies anomalies, uncertainty, contradictions, patterns.
4. **Hypothesis Generator** — Creates multiple explanations per observation (LLM).
5. **Information Seeker** — Selects the single most useful question for the user.
6. **User Answer** — User responds to reduce uncertainty.
7. **Reasoning Engine** — Updates confidence scores for each hypothesis.
8. **Discovery Engine** — Generates the final investigation report.

Each module in `backend/app/modules/` is designed to be independently replaceable.
