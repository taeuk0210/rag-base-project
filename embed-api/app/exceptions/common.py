from fastapi import status


class AppException(Exception):
    def __init__(self, message: str, status_code: int = status.HTTP_400_BAD_REQUEST):
        self.message = message
        self.status_code = status_code
        super().__init__(message)


class NotFoundException(AppException):
    def __init__(self):
        super().__init__(
            message="404 Not Found Exception", status_code=status.HTTP_404_NOT_FOUND
        )
