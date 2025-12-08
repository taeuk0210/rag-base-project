from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Any

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from passlib.context import CryptContext

from app.core.config import settings
from app.exceptions.common import *

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/users/login")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(subject: Dict[str, Any]) -> str:
    to_encode = subject.copy()
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    to_encode.update({"exp": expire, "type": "access"})
    return jwt.encode(
        to_encode, settings.SECURITY_SECRET_KEY, algorithm=settings.SECURITY_ALGORITHM
    )


def create_refresh_token(subject: Dict[str, Any]) -> str:
    to_encode = subject.copy()
    expire = datetime.now(timezone.utc) + timedelta(
        days=settings.REFRESH_TOKEN_EXPIRE_DAYS
    )
    to_encode.update({"exp": expire, "type": "refresh"})
    return jwt.encode(
        to_encode, settings.SECURITY_SECRET_KEY, algorithm=settings.SECURITY_ALGORITHM
    )


def decode_token(token: str) -> dict[str, Any]:
    return jwt.decode(
        token,
        settings.SECURITY_SECRET_KEY,
        algorithms=[settings.SECURITY_ALGORITHM],
    )


def get_current_user_id(token: str = Depends(oauth2_scheme)) -> int:
    try:
        payload = decode_token(token)
        user_id = payload.get("sub")

        if user_id is None:
            raise NotFoundException

        return user_id

    except JWTError as e:
        raise e
