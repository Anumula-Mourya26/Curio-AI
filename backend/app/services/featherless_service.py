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
        or adds extra text.
        """

        text = text.strip()

        # Remove ```json ... ```
        text = re.sub(r"^```json", "", text, flags=re.IGNORECASE).strip()
        text = re.sub(r"^```", "", text).strip()
        text = re.sub(r"```$", "", text).strip()

        # Find first { ... last }
        start = text.find("{")
        end = text.rfind("}")

        if start != -1 and end != -1:
            text = text[start:end + 1]

        return json.loads(text)

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

Rules:

- JSON ONLY
- No markdown
- No explanation
- curiosity_score must be integer 0-100

Idea:

{idea}

Focus:

{focus if focus else "None"}
"""

        response = self.client.chat.completions.create(
            model=settings.FEATHERLESS_MODEL,
            temperature=0.5,
            max_tokens=900,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Return ONLY valid JSON. "
                        "Never wrap JSON inside markdown."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
        )

        content = response.choices[0].message.content.strip()

        try:
            payload = self._extract_json(content)

            return {
                "assumptions": payload.get("assumptions", []),
                "blind_spots": payload.get("blind_spots", []),
                "risks": payload.get("risks", []),
                "questions": payload.get("questions", []),
                "missing_knowledge": payload.get("missing_knowledge", []),
                "curiosity_score": int(payload.get("curiosity_score", 0)),
                "recommended_next_step": payload.get(
                    "recommended_next_step",
                    "Continue investigating this idea."
                ),
            }

        except Exception as e:
            print("Featherless parse error:")
            print(e)
            print(content)

            return {
                "assumptions": [],
                "blind_spots": [],
                "risks": [],
                "questions": [],
                "missing_knowledge": [],
                "curiosity_score": 0,
                "recommended_next_step": "Unable to parse Featherless response.",
            }