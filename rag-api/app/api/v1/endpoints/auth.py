from fastapi import APIRouter, Depends, status, Response
from sqlalchemy.orm import Session

from app.cores.database import get_db
from app.schemas.auth import *
from app.services import auth as user_service

from app.cores.security import is_authed

router = APIRouter()


@router.post(
    "/signup",
    response_model=SignupResponse,
    status_code=status.HTTP_201_CREATED,
)
def signup(
    request: SignupRequest,
    db: Session = Depends(get_db),
) -> SignupResponse:
    return user_service.signup_user(db, request)


@router.post(
    "/login",
    response_model=LoginResponse,
    status_code=status.HTTP_200_OK,
)
def login(
    request: LoginRequest,
    response: Response,
    db: Session = Depends(get_db),
) -> LoginResponse:
    access_token = user_service.login_user(db, request)
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",  # | "none" + secure=True
        path="/",
    )
    return LoginResponse(ok=True)


@router.get(
    "/me",
    response_model=LoginResponse,
    status_code=status.HTTP_200_OK,
)
def me(
    user=Depends(is_authed),
) -> LoginResponse:
    return LoginResponse(ok=True)
