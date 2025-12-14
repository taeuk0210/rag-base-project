from sqlalchemy.orm import Session

from app.cores.security import (
    get_password_hash,
    verify_password,
    create_access_token,
)
from app.schemas.auth import *
from app.exceptions.users import *
from app.repositories import users


def signup_user(db: Session, request: SignupRequest) -> None:
    existing = users.get_user_by_email(db, request.user_email)
    if existing:
        raise DuplicatedEmailException()

    password_hash = get_password_hash(request.password)
    users.create_user(db, request, password_hash)
    return 


def login_user(db: Session, request: LoginRequest) -> str:
    user = users.get_user_by_email(db, request.user_email)
    if not user or not verify_password(request.password, user.password_hash):
        raise InvalidPasswordException()

    access_token = create_access_token(
        subject=user
    )
    return access_token
