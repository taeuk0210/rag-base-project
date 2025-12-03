from sqlalchemy.orm import Session

from app.core.security import (
    get_password_hash,
    verify_password,
    create_access_token,
)
from app.schemas.users import *
from app.exceptions.users import * 
from app.repositories.rdb import users


def signup_user(db: Session, data: UserCreate) -> UserInfo:
    existing = users.get_user_by_email(db, data.user_email)
    if existing:
        raise DuplicatedEmailException()

    password_hash = get_password_hash(data.password)
    user = users.create_user(db, data, password_hash)
    return UserInfo.model_validate(user)


def login_user(db: Session, data: UserLogin) -> Token:
    user = users.get_user_by_email(db, data.user_email)
    if not user or not verify_password(data.password, user.password_hash):
        raise InvalidPasswordException()
    
    access_token = create_access_token(subject=user.user_id)
    return Token(access_token=access_token)
