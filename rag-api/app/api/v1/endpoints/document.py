from fastapi import APIRouter, Depends, status, UploadFile, Form, File
from sqlalchemy.orm import Session

from app.cores.database import get_db
from app.cores.security import get_current_user_id
from app.schemas.document import *
from app.services import document as docs_service

router = APIRouter()


@router.post(
    "/",
    response_model=DocRegResponse,
    status_code=status.HTTP_201_CREATED,
)
def register_document(
    title: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
) -> DocRegResponse:
    request = DocRegRequest(title=title, file=file.read())
    return docs_service.register_document(request, db, user_id)
