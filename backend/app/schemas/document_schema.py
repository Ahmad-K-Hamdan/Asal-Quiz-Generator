from pydantic import BaseModel, Field, PositiveInt, field_validator


class DocumentOut(BaseModel):
    id: PositiveInt
    name: str = Field(min_length=3, max_length=100)
    path: str
    category_id: PositiveInt

    @field_validator("name")
    def validate_document_name(cls, document_name):
        document_name = document_name.strip()
        if not document_name:
            raise ValueError("Document name cannot be empty.")
        return document_name

    @field_validator("path")
    def validate_document_path(cls, document_path):
        document_path = document_path.strip()
        if not document_path:
            raise ValueError("Path cannot be empty.")
        return document_path

    class Config:
        orm_mode = True
