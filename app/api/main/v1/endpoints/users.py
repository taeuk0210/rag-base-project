from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.users import UserCreate, UserLogin, UserInfo, Token
from app.services import users as user_service

router = APIRouter()


@router.post(
    "/signup",
    response_model=UserInfo,
    status_code=status.HTTP_201_CREATED,
)
def signup(
    payload: UserCreate,
    db: Session = Depends(get_db),
) -> UserInfo:
    return user_service.signup_user(db, payload)


@router.post(
    "/login",
    response_model=Token,
    status_code=status.HTTP_200_OK,
)
def login(
    payload: UserLogin,
    db: Session = Depends(get_db),
) -> Token:
    return user_service.login_user(db, payload)
