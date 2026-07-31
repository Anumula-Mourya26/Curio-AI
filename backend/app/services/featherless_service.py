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
        """
        Extract JSON even if the model wraps it inside markdown
        or writes extra text.
        """

        text = text.strip()

        # Try direct JSON first
        try:
            return json.loads(text)
        except Exception:
            pass

        # Remove ```json ... ```
        text = re.sub(r"```json", "", text, flags=re.IGNORECASE)
        text = re.sub(r"```", "", text).strip()

        try:
            return json.loads(text)
        except Exception:
            pass

        # Extract first JSON object
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

Challenge the following idea.

Return ONLY valid JSON.

Schema:

{{
  "assumptions": [],
  "blind_spots": [],
  "risks": [],
  "questions": [],
  "missing_knowledge": [],
  "curiosity_score": 0,
  "recommended_next_step": ""
}}

Idea:
{idea}

Focus:
{focus if focus else "None"}
"""

        response = self.client.chat.completions.create(
            model=settings.FEATHERLESS_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a rigorous startup critic. "
                        "Always return ONLY JSON."
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

        # ==========================
        # DEBUG OUTPUT
        # ==========================
        print("\n")
        print("=" * 60)
        print("RAW FEATHERLESS RESPONSE")
        print("=" * 60)
        print(content)
        print("=" * 60)
        print("\n")

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
            "curiosity_score": payload.get("curiosity_score", 0),
            "recommended_next_step": payload.get(
                "recommended_next_step",
                ""
            ),
        }