from app.routers import (
    categories_router,
    documents_router,
    users_router,
)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routers
app.include_router(users_router.router)
app.include_router(documents_router.router)
app.include_router(categories_router.router)
