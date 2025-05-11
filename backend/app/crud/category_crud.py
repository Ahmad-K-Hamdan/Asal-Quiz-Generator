from app.azure.storage_account_azure import AzureBlobStorage
from app.models.db_models import Category
from app.schemas.category_schema import CategoryForm
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session


class CategoryCrud:
    def __init__(self, db: Session):
        self.__db = db

    def fetch_all_categories(self):
        return self.__db.execute(select(Category)).scalars().all()

    def insert_new_category(self, user_id: int, data: CategoryForm):
        category = self.__db.execute(
            select(Category).where(
                Category.name == data.name, Category.user_id == user_id
            )
        ).scalar_one_or_none()

        if category:
            raise HTTPException(
                status_code=400, detail="Category with this name already exists."
            )

        category = Category(name=data.name, user_id=user_id)
        self.__db.add(category)
        self.__db.commit()
        self.__db.refresh(category)
        return category

    def delete_category_by_id(self, user_id: int, category_id: int):
        # Creating an instance of the azure blob storage class to get access to the delete blob function
        azure_blob_storage = AzureBlobStorage()
        category = self.__db.get(Category, category_id)

        if not category:
            raise HTTPException(status_code=404, detail="Category not found.")

        if category.user_id != user_id:
            raise HTTPException(
                status_code=403, detail="Not authorized to delete this category."
            )

        for doc in category.documents:
            try:
                azure_blob_storage.delete_blob(doc.path)
            except Exception as e:
                print("Warning: Failed to delete blob", e)

        self.__db.delete(category)
        self.__db.commit()
        return True
