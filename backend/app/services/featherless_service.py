"""
Featherless AI Service.

Uses Featherless AI to challenge an idea by surfacing assumptions,
blind spots, risks, and questions the user did not consider.
"""

import json

from openai import OpenAI

from app.core.config import settings


class FeatherlessService:
    """Handles communication with Featherless AI."""

    def __init__(self):
        self.client = OpenAI(
            api_key=settings.FEATHERLESS_API_KEY,
            base_url=settings.FEATHERLESS_BASE_URL,
        )

    def generate_review(self, idea: str, focus: str | None = None):
        prompt = f"""
You are Curio, an AI that challenges ideas instead of answering them.

Investigate the idea below and produce a critique that exposes hidden assumptions,
blind spots, weaknesses, missing evidence, difficult questions, and the next investigation.

Do not summarize the idea. Do not be polite. Challenge it.

Return ONLY valid JSON with this exact schema:

{{
    "assumptions": ["Assumption 1", "Assumption 2"],
    "blind_spots": ["Blind spot 1", "Blind spot 2"],
    "risks": ["Risk 1", "Risk 2"],
    "questions": ["Question 1", "Question 2"],
    "missing_knowledge": ["Missing knowledge 1", "Missing knowledge 2"],
    "curiosity_score": 0,
    "recommended_next_step": "A concrete next investigation"
}}

Rules:
- Return ONLY JSON.
- Do NOT use markdown.
- Do NOT wrap in ```json.
- Do NOT explain anything.
- curiosity_score must be an integer between 0 and 100.
- Focus on the idea itself, not on generic advice.

Idea:
{idea}

Focus:
{focus if focus else 'None'}
"""

        response = self.client.chat.completions.create(
            model=settings.FEATHERLESS_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are Curio, a rigorous critique engine. "
                        "Always return valid JSON and challenge the idea directly."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            temperature=0.7,
            max_tokens=900,
        )

        content = response.choices[0].message.content.strip()

        try:
            payload = json.loads(content)
            return {
                "assumptions": payload.get("assumptions", []),
                "blind_spots": payload.get("blind_spots", []),
                "risks": payload.get("risks", []),
                "questions": payload.get("questions", []),
                "missing_knowledge": payload.get("missing_knowledge", []),
                "curiosity_score": payload.get("curiosity_score", 0),
                "recommended_next_step": payload.get("recommended_next_step", "Continue investigating the idea"),
            }
        except Exception:
            return {
                "assumptions": [],
                "blind_spots": [],
                "risks": [],
                "questions": [],
                "missing_knowledge": [],
                "curiosity_score": 0,
                "recommended_next_step": content,
            }