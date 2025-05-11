from typing import Annotated

from app.authentication.token_utils import get_user_id
from app.crud.category_crud import CategoryCrud
from app.database.connection_database import SessionLocal
from app.schemas.category_schema import CategoryForm, CategoryOut
from fastapi import APIRouter, Depends, Form, HTTPException, Response, status

router = APIRouter()


@router.get("/categories/", response_model=list[CategoryOut], tags=["categories"])
def get_categories():
    try:
        with SessionLocal() as db:
            category_crud = CategoryCrud(db=db)
            categories = category_crud.fetch_all_categories()

            return [
                CategoryOut(id=category.id, name=category.name)
                for category in categories
            ]

    except Exception as e:
        print("Error fetching categories:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch categories.")


@router.post("/categories/", response_model=CategoryOut, tags=["categories"])
def insert_category(
    data: Annotated[CategoryForm, Form()], user_id: int = Depends(get_user_id)
):
    try:
        with SessionLocal() as db:
            category_crud = CategoryCrud(db=db)
            category = category_crud.insert_new_category(user_id, data)
            return CategoryOut(id=category.id, name=category.name)

    except HTTPException:
        raise

    except Exception as e:
        print("Error inserting category:", e)
        raise HTTPException(status_code=500, detail="Failed to insert category.")


@router.delete(
    "/categories/{category_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["categories"],
)
def delete_category(category_id: int, user_id: int = Depends(get_user_id)):
    try:
        with SessionLocal() as db:
            category_crud = CategoryCrud(db=db)
            category_crud.delete_category_by_id(user_id, category_id)
            return Response(status_code=status.HTTP_204_NO_CONTENT)

    except HTTPException:
        raise

    except Exception as e:
        print(f"Error deleting category: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete category.")
