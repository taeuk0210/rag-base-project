from typing import Optional

from sqlalchemy.orm import Session

from app.schemas.users import UserCreate
from app.models.user import User


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.user_email == email).first()


def create_user(db: Session, data: UserCreate, password_hash: str) -> User:
    user = User(
        user_email=data.user_email,
        password_hash=password_hash,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
