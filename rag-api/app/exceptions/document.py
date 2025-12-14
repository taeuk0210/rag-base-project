from fastapi import status

from app.exceptions.common import AppException


class DocumentNotFound(AppException):
    def __init__(self):
        super().__init__(
            message="존재하지 않는 문서입니다.", status_code=status.HTTP_404_NOT_FOUND
        )
