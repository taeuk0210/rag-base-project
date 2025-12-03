from fastapi import FastAPI
from app.api.main.v1.endpoints import docs, users

app = FastAPI()

app.include_router(docs.router, prefix="/api/v1/docs", tags=["docs"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])