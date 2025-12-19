from typing import Optional

from sqlalchemy.orm import Session

from app.schemas.auth import SignupRequest
from app.models.user_info import UserInfo


def get_user_by_email(db: Session, email: str) -> Optional[UserInfo]:
    return db.query(UserInfo).filter(UserInfo.email == email).first()


def create_user(db: Session, data: SignupRequest, password_hash: str) -> UserInfo:
    user = UserInfo(
        email=data.email,
        password_hash=password_hash,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
