from sqlalchemy.orm import Session

from app.schemas.document import *
from app.exceptions.document import *
from app.repositories import document as docs_repository
from app.stores import file_storage


def register_document(
    request: DocRegRequest,
    db: Session,
    user_id: int,
) -> DocRegResponse:
    url = file_storage.save(request.title, request.file)
    docs_repository.create_document(request, db, user_id, url)
    return DocRegResponse()
