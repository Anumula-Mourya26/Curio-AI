"""
Featherless AI Service.

Uses Featherless AI to challenge an idea by surfacing assumptions,
blind spots, risks, and questions the user did not consider.
"""

import json
import re

from openai import OpenAI

from app.core.config import settings


class FeatherlessService:
    """Handles communication with Featherless AI."""

    def __init__(self):
        self.client = OpenAI(
            api_key=settings.FEATHERLESS_API_KEY,
            base_url=settings.FEATHERLESS_BASE_URL,
        )

    def _extract_json(self, text: str):
        """Extract JSON even if wrapped in markdown."""

        text = text.strip()

        try:
            return json.loads(text)
        except Exception:
            pass

        text = re.sub(r"```json", "", text, flags=re.IGNORECASE)
        text = re.sub(r"```", "", text).strip()

        try:
            return json.loads(text)
        except Exception:
            pass

        match = re.search(r"\{.*\}", text, re.DOTALL)

        if match:
            try:
                return json.loads(match.group())
            except Exception:
                pass

        return None

    def generate_review(self, idea: str, focus: str | None = None):

        prompt = f"""
You are Curio.

Curio is NOT an assistant.
Curio is an intelligent second-opinion engine that challenges business ideas,
startup concepts, research proposals and strategic decisions.

Your objective is NOT to validate ideas.
Your objective is to expose hidden weaknesses before they become expensive mistakes.

Think like:

• Startup Investor
• Product Manager
• Competitor
• Customer
• Engineer
• Risk Analyst

Challenge the idea from multiple perspectives.

Do NOT give generic answers.

Every point must be specific to THIS idea.

For each section generate 3-6 concise bullet points.

Curiosity Score Rules:

90-100 = Outstanding idea with excellent evidence and few assumptions

75-89 = Strong idea with manageable weaknesses

60-74 = Good idea but needs more validation

40-59 = Average idea with several important assumptions

20-39 = Weak idea with major risks

0-19 = Fundamentally flawed or unrealistic

IMPORTANT

Do NOT always give low scores.

Most realistic startup ideas should score between 60 and 80.

Only give below 40 if the proposal is genuinely weak.

Return ONLY JSON.

Schema:

{{
  "assumptions":[
    "...",
    "..."
  ],
  "blind_spots":[
    "...",
    "..."
  ],
  "risks":[
    "...",
    "..."
  ],
  "questions":[
    "...",
    "..."
  ],
  "missing_knowledge":[
    "...",
    "..."
  ],
  "curiosity_score":75,
  "recommended_next_step":"..."
}}

Idea:

{idea}

Focus:

{focus if focus else "General critique"}
"""

        response = self.client.chat.completions.create(
            model=settings.FEATHERLESS_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": """
You are Curio.

You challenge ideas instead of validating them.

Never praise ideas.

Always identify hidden assumptions, weak evidence, execution risks,
competitive threats and unanswered questions.

Return ONLY valid JSON.

Never wrap JSON inside markdown.

Never explain the JSON.
""",
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            temperature=0.6,
            max_tokens=1100,
        )

        content = response.choices[0].message.content.strip()

        print("=" * 70)
        print("RAW FEATHERLESS RESPONSE")
        print("=" * 70)
        print(content)
        print("=" * 70)

        payload = self._extract_json(content)

        if payload is None:
            print("FAILED TO PARSE JSON")

            return {
                "assumptions": [],
                "blind_spots": [],
                "risks": [],
                "questions": [],
                "missing_knowledge": [],
                "curiosity_score": 0,
                "recommended_next_step": content,
            }

        print("JSON PARSED SUCCESSFULLY")

        return {
            "assumptions": payload.get("assumptions", []),
            "blind_spots": payload.get("blind_spots", []),
            "risks": payload.get("risks", []),
            "questions": payload.get("questions", []),
            "missing_knowledge": payload.get("missing_knowledge", []),
            "curiosity_score": payload.get("curiosity_score", 70),
            "recommended_next_step": payload.get(
                "recommended_next_step",
                "Validate the biggest assumptions before moving forward."
            ),
        }