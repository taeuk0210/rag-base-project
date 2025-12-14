from datetime import datetime, timedelta, timezone

from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import Depends, Request, HTTPException
from fastapi.security import OAuth2PasswordBearer

from app.cores.config import settings
from app.models.user import User
from app.exceptions.common import *

pwd_context = CryptContext(schemes=["bcrypt_sha256"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(user: User) -> str:
    to_encode = {"id": str(user.id)}
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    to_encode.update({"exp": expire, "type": "access"})
    return jwt.encode(
        to_encode, settings.SECURITY_SECRET_KEY, algorithm=settings.SECURITY_ALGORITHM
    )


def get_current_user_id(request: Request) -> str:
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    payload = jwt.decode(
        token, settings.SECURITY_SECRET_KEY, algorithms=[settings.SECURITY_ALGORITHM]
    )
    return payload["id"]


def is_authed(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    return jwt.decode(
        token,
        settings.SECURITY_SECRET_KEY,
        algorithms=[settings.SECURITY_ALGORITHM],
    )
