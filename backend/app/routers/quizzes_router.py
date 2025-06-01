from app.authentication.token_utils import get_user_id
from app.crud.quiz_crud import QuizCrud
from app.database.connection_database import SessionLocal
from app.schemas.quiz_schema import QuizDetailOut, QuizListOut
from fastapi import APIRouter, Depends, HTTPException, Response, status

router = APIRouter()


@router.delete(
    "/quizzes/{quiz_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["quizzes"],
)
def delete_quiz(quiz_id: int, user_id: int = Depends(get_user_id)):
    try:
        with SessionLocal() as db:
            quiz_crud = QuizCrud(db)
            quiz_crud.delete_quiz(quiz_id, user_id)
            return Response(status_code=status.HTTP_204_NO_CONTENT)
    except HTTPException:
        raise
    except Exception as e:
        print("Error deleting quiz:", e)
        raise HTTPException(status_code=500, detail="Failed to delete quiz.")


@router.get(
    "/categories/{category_id}/quizzes",
    response_model=list[QuizListOut],
    tags=["quizzes"],
)
def get_category_quizzes(category_id: int, user_id: int = Depends(get_user_id)):
    try:
        with SessionLocal() as db:
            crud = QuizCrud(db)
            quizzes = crud.get_quizzes_by_category(user_id, category_id)
            return quizzes
    except Exception as e:
        print("Error fetching quizzes:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch quizzes")


@router.get("/quizzes/{quiz_id}", response_model=QuizDetailOut, tags=["quizzes"])
def get_quiz_by_id(quiz_id: int, user_id: int = Depends(get_user_id)):
    with SessionLocal() as db:
        crud = QuizCrud(db)
        return crud.get_quiz_with_questions(quiz_id, user_id)
