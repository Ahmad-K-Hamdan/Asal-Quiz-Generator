from app.auth.password_utils import hash_password
from app.models.user import Users
from app.schemas.user import UserSignup
from app.string_utils import normalize_email
from sqlalchemy.orm import Session


def get_user_by_email(db: Session, email: str):
    email = normalize_email(email)
    return db.query(Users).filter(Users.email == email).first()


def create_user(db: Session, user: UserSignup):
    hashed_pwd = hash_password(user.password)
    email = normalize_email(user.email)
    new_user = Users(name=user.name, email=email, hashed_password=hashed_pwd)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
