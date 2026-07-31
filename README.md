# 🧠 Curio — AI That Questions Your Ideas

> *The second opinion your idea didn't know it needed.*

---

# 🚀 The Core Idea

Curio is an AI-powered web application that **questions ideas instead of answering them**.

Unlike traditional AI assistants that generate confident responses, Curio performs a structured critique of any idea, claim, business plan, hypothesis, or strategy. It uncovers hidden assumptions, blind spots, risks, unanswered questions, and missing knowledge, helping users think more critically before making decisions.

Curio is intentionally **not a chatbot**. Instead of validating your thinking, it challenges it.

---

# ❓ Problem Statement

Modern AI tools are exceptional at generating answers, but they rarely question the reasoning behind the user's idea.

People increasingly depend on AI for:

- Startup ideas
- Business strategies
- Research proposals
- Product planning
- Academic work
- Personal decision making

While these tools provide confident responses, they often reinforce incomplete thinking instead of exposing weaknesses.

This leads to decisions that feel validated by AI without ever being critically examined.

Users often fail to recognize:

- Hidden assumptions
- Missing evidence
- Execution risks
- Alternative viewpoints
- Important unanswered questions

---

# 💡 Our Solution

Curio flips the traditional AI interaction model.

Instead of answering your idea, Curio investigates it.

Users submit an idea, claim, research proposal, business concept, or strategic plan.

Curio then performs a structured investigation by identifying:

- Hidden Assumptions
- Blind Spots
- Risks
- Missing Knowledge
- Critical Questions

Finally, Curio generates a **Curiosity Score**, representing how thoroughly the idea has been examined.

Users can also perform **deeper investigations** into any individual finding for more focused analysis.

Curio isn't another AI chatbot.

It's a structured second-opinion engine built to improve thinking before decisions are made.

---

# ✨ Features

- 🧠 Hidden Assumption Detection
- 👀 Blind Spot Identification
- ⚠️ Risk Analysis
- 📚 Missing Knowledge Discovery
- ❓ Critical Follow-up Questions
- 📈 Curiosity Score Generation
- 🔍 Deep Investigation Mode
- 🚫 Non-chatbot structured reasoning

---

# ⚙️ How Curio Works

1. User enters an idea, claim, hypothesis, or business plan.
2. Curio analyzes the reasoning behind it.
3. AI identifies:
   - Hidden assumptions
   - Blind spots
   - Risks
   - Missing knowledge
   - Critical questions
4. A Curiosity Score is generated.
5. Users can investigate any finding in greater detail.
6. Curio provides a structured report that helps users refine their thinking.

---

# 🎯 Example Use Cases

Curio can be used for:

- Startup idea validation
- Business planning
- Product strategy
- Research hypothesis evaluation
- Academic brainstorming
- Investment analysis
- Critical thinking exercises
- Personal decision making
- Innovation workshops

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS

## Backend

- FastAPI
- Python

## AI

- Featherless AI (OpenAI-Compatible API)

## Deployment

- Vercel
- Render

---

# 📂 Project Structure

```
Curio/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── services/
│   │   └── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── assets/
│   └── package.json
│
└── README.md
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🌍 Why Curio?

Traditional AI focuses on providing answers.

Curio focuses on improving the quality of the thinking behind the question.

Rather than replacing human reasoning, Curio strengthens it by exposing what has not yet been considered.

Instead of asking:

> "What's the answer?"

Curio asks:

> "What haven't you thought about yet?"

---

# 🔮 Future Scope

- Multi-round investigations
- Team collaboration
- Investigation history
- Exportable PDF reports
- Industry-specific critique modes
- Comparative analysis between multiple ideas
- Personalized reasoning profiles
- AI-powered research recommendations

---

# 📸 Demo

## 🌐 Live Application

**Frontend**

https://curio-ai-git-main-mourya1.vercel.app

**Backend API**

https://curio-ai-z6cy.onrender.com

**API Documentation (Swagger)**

https://curio-ai-z6cy.onrender.com/docs

**GitHub Repository**

https://github.com/Anumula-Mourya26/Curio-AI

---
    
# 👥 Team

Developed as a hackathon project exploring **Artificial Curiosity as a Service (ACaaS)** — a new approach to AI that promotes deeper thinking instead of simply generating answers.

Our vision is to build AI that challenges ideas before they become decisions.

---

# 📜 License

This project is developed for educational and hackathon purposes.

Feel free to explore, learn from, and build upon the ideas presented here.