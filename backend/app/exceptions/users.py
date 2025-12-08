from fastapi import status

from app.exceptions.common import AppException


class DuplicatedEmailException(AppException):
    def __init__(self):
        super().__init__(
            message="이미 가입된 이메일입니다.", status_code=status.HTTP_409_CONFLICT
        )


class InvalidPasswordException(AppException):
    def __init__(self):
        super().__init__(
            message="이메일 또는 비밀번호가 올바르지 않습니다.",
            status_code=status.HTTP_401_UNAUTHORIZED,
        )
