from typing import Literal

from pydantic import BaseModel


class QuestionSchema(BaseModel):
    question_number: int
    question: str
    type: Literal["multiple_choice", "short_answer"]
    choices: list[str] | None = None
    correct_answer: str
    explanation: str
