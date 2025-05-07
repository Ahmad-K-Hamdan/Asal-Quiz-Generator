# creation.py

from app.models.user import Base
from app.schemas.db import DATABASE_URL
from sqlalchemy import create_engine

# Create engine using your database URL
engine = create_engine(DATABASE_URL)

# Create all tables
Base.metadata.create_all(engine)

print("Tables created successfully.")
