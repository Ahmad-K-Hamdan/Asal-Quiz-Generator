import json
from datetime import datetime
from uuid import uuid4

from app.azure.storage_account_azure import AzureBlobStorage
from app.models.db_models import QuizAttempt
from app.schemas.quiz_attempt_schema import (
    DetailedAnswerItem,
    QuizAttemptDetailOut,
    QuizAttemptOut,
)
from fastapi import HTTPException
from sqlalchemy.orm import Session


class QuizAttemptCrud:
    def __init__(self, db: Session):
        self.__db = db

    def create_attempt(
        self, user_id: int, answers: list[DetailedAnswerItem]
    ) -> QuizAttemptOut:
        full_attempt = {
            "submitted_at": datetime.utcnow().isoformat(),
            "answers": [a.dict() for a in answers],
        }

        blob_service = AzureBlobStorage()
        blob_path = f"documents/attempts/{uuid4()}.json"
        blob_service.upload_json(full_attempt, blob_path)

        attempt = QuizAttempt(
            user_id=user_id, submitted_at=datetime.utcnow(), path=blob_path
        )
        self.__db.add(attempt)
        self.__db.commit()
        self.__db.refresh(attempt)

        return QuizAttemptOut(id=attempt.id, submitted_at=attempt.submitted_at)

    def get_attempt_details(
        self, attempt_id: int, user_id: int
    ) -> QuizAttemptDetailOut:
        attempt = (
            self.__db.query(QuizAttempt)
            .filter(QuizAttempt.id == attempt_id, QuizAttempt.user_id == user_id)
            .first()
        )

        if not attempt:
            raise HTTPException(status_code=404, detail="Attempt not found.")

        try:
            blob_service = AzureBlobStorage()
            data = blob_service.retrieve_blob(attempt.path)
            if isinstance(data, str):
                data = json.loads(data)
        except Exception:
            raise HTTPException(status_code=500, detail="Failed to load attempt data.")

        return QuizAttemptDetailOut(
            id=attempt.id,
            submitted_at=attempt.submitted_at,
            answers=[DetailedAnswerItem(**a) for a in data["answers"]],
        )

    def get_user_attempts(self, user_id: int) -> list[QuizAttemptOut]:
        attempts = (
            self.__db.query(QuizAttempt)
            .filter(QuizAttempt.user_id == user_id)
            .order_by(QuizAttempt.submitted_at.desc())
            .all()
        )

        return [
            QuizAttemptOut(id=att.id, submitted_at=att.submitted_at) for att in attempts
        ]
