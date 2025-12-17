from typing import Optional

from sqlalchemy.orm import Session

from app.models.document import Document
from app.schemas.document import *


def create_document(
    request: DocRegRequest, db: Session, user_id: int, url: str
) -> Document:
    doc = Document(
        user_id=user_id,
        title=request.title,
        url=url,
        size=len(request.file),
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc
