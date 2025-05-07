from app.auth.password_utils import verify_password
from app.auth.token_utils import create_access_token
from app.cruds.user_crud import create_user, get_user_by_email
from app.db import get_db
from app.schemas.user import LoginResponse, UserLogin, UserSignup
from app.string_utils import normalize_email
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(user: UserSignup, db: Session = Depends(get_db)):
    normalized_email = normalize_email(user.email)

    user_in_db = get_user_by_email(db, normalized_email)
    if user_in_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered"
        )

    user.email = normalized_email
    new_user = create_user(db, user)

    return {"user_id": new_user.id}


@router.post("/login", response_model=LoginResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    normalized_email = normalize_email(user.email)

    user_in_db = get_user_by_email(db, normalized_email)
    if not user_in_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Email not found"
        )

    if not verify_password(user.password, user_in_db.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect password"
        )

    access_token = create_access_token(user_in_db.id)
    return LoginResponse(
        access_token=access_token, token_type="bearer", user_id=user_in_db.id
    )
