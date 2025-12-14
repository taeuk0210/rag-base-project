from fastapi import FastAPI

from app.api.v1.endpoints import auth, document, chat

app = FastAPI()

app.include_router(document.router, prefix="/api/v1/docs", tags=["docs"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(chat.router, prefix="/api/v1/chats", tags=["chats"])
