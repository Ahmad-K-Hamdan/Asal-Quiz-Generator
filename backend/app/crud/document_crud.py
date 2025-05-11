from app.azure.storage_account_azure import AzureBlobStorage
from app.models.db_models import Category, Document
from app.utils.file_checks import check_file_extension, check_file_size
from fastapi import HTTPException, UploadFile
from sqlalchemy import select
from sqlalchemy.orm import Session


class DocumentCrud:

    def __init__(self, db: Session):
        self.__db = db

    def fetch_all_documents(self):
        return self.__db.execute(select(Document)).scalars().all()

    def get_documents_by_category_id(self, user_id: int, category_id: int):
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
            self.__db.execute(
                select(Document).where(Document.category_id == category_id)
            )
            .scalars()
            .all()
        )

    def upload_documents_to_category(
        self, user_id: int, category_id: int, files: list[UploadFile]
    ):
        category = self.__db.execute(
            select(Category).where(Category.id == category_id)
        ).scalar_one_or_none()

        if not category:
            raise HTTPException(status_code=404, detail="Category not found.")

        if category.user_id != user_id:
            raise HTTPException(
                status_code=403, detail="No permission to upload to this category."
            )

        uploaded_docs = []
        azure_blob_storage = AzureBlobStorage()

        for file in files:
            if not check_file_extension(file.filename):
                raise HTTPException(status_code=400, detail="File type not allowed.")
            if not check_file_size(file):
                raise HTTPException(
                    status_code=400, detail="File size exceeds the limit."
                )

            blob_url = azure_blob_storage.upload_file(file, file.filename)

            document = Document(
                name=file.filename, path=blob_url, category_id=category_id
            )
            self.__db.add(document)
            uploaded_docs.append(document)

        self.__db.commit()
        return uploaded_docs

    def delete_document_by_id(self, user_id: int, document_id: int):
        document = self.__db.get(Document, document_id)
        if not document:
            raise HTTPException(status_code=404, detail="Document not found.")

        category = self.__db.get(Category, document.category_id)
        if not category:
            raise HTTPException(
                status_code=404, detail="Associated category not found."
            )

        if category.user_id != user_id:
            raise HTTPException(
                status_code=403, detail="No permission to delete this document."
            )

        azure_blob_storage = AzureBlobStorage()
        azure_blob_storage.delete_blob(document.path)

        self.__db.delete(document)
        self.__db.commit()
