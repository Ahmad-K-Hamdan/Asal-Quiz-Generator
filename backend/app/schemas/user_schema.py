import re
from datetime import datetime

from app.models.db_models import Category, User
from app.schemas.category_schema import CategoryOut
from app.schemas.document_schema import DocumentOut
from pydantic import BaseModel, EmailStr, PositiveInt, field_validator


def check_password_strength(password: str):
    if len(password.strip()) < 8:
        raise ValueError("Password must be at least 8 characters long.")
    if not re.search(r"[A-Z]", password):
        raise ValueError("Password must contain at least one uppercase letter.")
    if not re.search(r"[a-z]", password):
        raise ValueError("Password must contain at least one lowercase letter.")
    if not re.search(r"\d", password):
        raise ValueError("Password must contain at least one digit.")
    if not re.search(r"[-_@#&]", password):
        raise ValueError(
            "Password must contain at least one special character (-,_,@,#,&)."
        )
    return password.strip()


class BaseUser(BaseModel):
    name: str
    email: EmailStr

    @field_validator("name")
    def validate_name(cls, name: str):
        name = name.strip()
        if not name:
            raise ValueError("User name cannot be empty.")
        if len(name) < 3:
            raise ValueError("User name must be at least 3 characters.")
        return name

    @field_validator("email")
    def validate_email(cls, email: str):
        email = email.strip()
        if not email:
            raise ValueError("Email cannot be empty.")
        return email


class UserSignup(BaseUser):
    password: str

    @field_validator("password")
    def validate_password(cls, password: str):
        return check_password_strength(password)

    class Config:
        orm_mode = True


class UserLogin(BaseModel):
    email: EmailStr
    password: str

    @field_validator("email")
    def validate_email(cls, email: str):
        email = email.strip()
        if not email:
            raise ValueError("Email cannot be empty.")
        return email

    @field_validator("password")
    def validate_password(cls, password: str):
        return check_password_strength(password)

    class Config:
        orm_mode = True


class UserOut(BaseUser):
    id: PositiveInt
    created_at: datetime

    class Config:
        orm_mode = True


class SignupResponse(BaseModel):
    id: PositiveInt
    name: str
    email: EmailStr
    created_at: datetime

    @field_validator("name")
    def validate_name(cls, name: str):
        name = name.strip()
        if not name:
            raise ValueError("Name cannot be empty.")
        return name

    @field_validator("email")
    def validate_email(cls, email: str):
        email = email.strip()
        if not email:
            raise ValueError("Email cannot be empty.")
        return email

    class Config:
        orm_mode = True


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user_id: PositiveInt

    @field_validator("access_token", "token_type")
    def validate_token_fields(cls, token_field: str):
        if not token_field.strip():
            raise ValueError("This field cannot be empty.")
        return token_field.strip()

    class Config:
        orm_mode = True


class UserDetailsResponse(BaseModel):
    user: UserOut
    categories: list[CategoryOut]
    documents: list[DocumentOut]


def serializeUser(user: User):
    return UserOut(
        id=user.id,
        name=user.name,
        email=user.email,
        created_at=user.created_at,
    )


def serializeCategories(categories: list[Category]):
    return [CategoryOut(id=cat.id, name=cat.name) for cat in categories]


def serializeDocuments(categories: list[Category]):
    return [
        DocumentOut(
            id=doc.id, name=doc.name, path=doc.path, category_id=doc.category_id
        )
        for cat in categories
        for doc in cat.documents
    ]
