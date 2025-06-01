import json
from urllib.parse import unquote

from app.azure.storage_account_azure import AzureBlobStorage
from app.models.db_models import Category, Quiz
from app.schemas.question_schema import QuestionSchema
from app.schemas.quiz_schema import QuizDetailOut
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session


class QuizCrud:
    def __init__(self, db: Session):
        self.__db = db

    def delete_quiz(self, quiz_id: int, user_id: int):
        quiz = self.__db.get(Quiz, quiz_id)
        if not quiz:
            raise HTTPException(status_code=404, detail="Quiz not found.")

        if not quiz.category or quiz.category.user_id != user_id:
            raise HTTPException(
                status_code=403, detail="Not authorized to access this quiz."
            )

        blob_service = AzureBlobStorage()
        try:
            blob_name = unquote("/".join(quiz.path.split("/")[-4:]))
            print(f"Deleting blob: {blob_name}")
            blob_service.container_client.delete_blob(blob_name)
        except Exception as e:
            print("Failed to delete blob:", e)
            raise HTTPException(
                status_code=500, detail="Failed to delete file from storage."
            )

        self.__db.delete(quiz)
        self.__db.commit()

    def get_quizzes_by_category(self, user_id: int, category_id: int):
        category = self.__db.execute(
            select(Category).where(Category.id == category_id)
        ).scalar_one_or_none()

        if not category:
            raise HTTPException(status_code=404, detail="Category not found.")

        if category.user_id != user_id:
            raise HTTPException(
                status_code=403,
                detail="No permission to access this category's documents.",
            )

        return (
            self.__db.execute(select(Quiz).where(Quiz.category_id == category_id))
            .scalars()
            .all()
        )

    def get_quiz_with_questions(self, quiz_id: int, user_id: int):
        quiz = self.__db.get(Quiz, quiz_id)
        if not quiz:
            raise HTTPException(status_code=404, detail="Quiz not found.")

        if not quiz.category or quiz.category.user_id != user_id:
            raise HTTPException(
                status_code=403, detail="Not authorized to access this quiz."
            )

        blob_service = AzureBlobStorage()
        questions_data = blob_service.retrieve_blob(quiz.path)
        try:
            if isinstance(questions_data, str):
                questions_data = json.loads(questions_data)
            questions = [QuestionSchema(**q) for q in questions_data]

            questions = sorted(questions, key=lambda q: q.question_number)

        except Exception as e:
            print("Warning: Failed to parse quiz file from blob:", e)
            questions = None

        return QuizDetailOut(
            id=quiz.id,
            name=quiz.name,
            level=quiz.level,
            path=quiz.path,
            category_id=quiz.category_id,
            created_at=quiz.created_at,
            questions=questions,
        )
