from app.authentication.token_utils import get_user_id
from app.crud.quiz_attempt_crud import QuizAttemptCrud
from app.database.connection_database import SessionLocal
from app.schemas.quiz_attempt_schema import (
    AttemptCreateRequest,
    QuizAttemptDetailOut,
    QuizAttemptOut,
)
from fastapi import APIRouter, Depends, HTTPException

router = APIRouter()


@router.get(
    "/attempts",
    response_model=list[QuizAttemptOut],
    tags=["quiz_attempts"],
    summary="Get all attempts made by the current user",
)
def get_user_attempts(user_id: int = Depends(get_user_id)):
    try:
        with SessionLocal() as db:
            crud = QuizAttemptCrud(db)
            return crud.get_user_attempts(user_id)
    except Exception as e:
        print("Error retrieving attempts:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch attempts.")


@router.get(
    "/attempts/{attempt_id}",
    response_model=QuizAttemptDetailOut,
    tags=["quiz_attempts"],
    summary="Get detailed view of a specific attempt",
)
def get_attempt_detail(attempt_id: int, user_id: int = Depends(get_user_id)):
    try:
        with SessionLocal() as db:
            crud = QuizAttemptCrud(db)
            return crud.get_attempt_details(attempt_id, user_id)
    except HTTPException:
        raise
    except Exception as e:
        print("Error retrieving attempt detail:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch attempt detail.")


@router.post("/attempts", response_model=QuizAttemptOut, tags=["quiz_attempts"])
def submit_quiz_attempt(
    payload: AttemptCreateRequest,
    user_id: int = Depends(get_user_id),
):
    try:
        with SessionLocal() as db:
            crud = QuizAttemptCrud(db)
            return crud.create_attempt(user_id, payload.answers)
    except HTTPException:
        raise
    except Exception as e:
        print("Error submitting attempt:", e)
        raise HTTPException(status_code=500, detail="Failed to submit attempt.")
