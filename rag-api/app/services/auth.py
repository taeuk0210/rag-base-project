from sqlalchemy.orm import Session

from app.cores.security import (
    get_password_hash,
    verify_password,
    create_access_token,
)
from app.schemas.auth import *
from app.exceptions.auth import *
from app.repositories import user as user_repository


def signup_user(db: Session, request: SignupRequest) -> SignupResponse:
    existing = user_repository.get_user_by_email(db, request.email)
    if existing:
        raise DuplicatedEmailException()

    password_hash = get_password_hash(request.password)
    user_repository.create_user(db, request, password_hash)
    return SignupResponse()


def login_user(db: Session, request: LoginRequest) -> str:
    user = user_repository.get_user_by_email(db, request.email)
    if not user or not verify_password(request.password, user.password_hash):
        raise InvalidLoginException()

    return create_access_token(user)
