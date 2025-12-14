from typing import Optional

from sqlalchemy.orm import Session

from app.models.document import Document
from app.schemas.document import *


def get_document_by_id(db: Session, document_id: int) -> Optional[Document]:
    doc = db.query(Document).filter(Document.document_id == document_id).first()
    return DocumentInfo.model_validate(doc)


def create_document(db: Session, data: DocumentCreate) -> Document:
    doc = Document(title=data.title, file_path=data.file_path, user_id=data.user_id)
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc


def get_documents_by_title(
    db: Session, query: str, page: int, num_items: int
) -> list[Document]:

    return (
        db.query(Document)
        .filter(Document.title.like(f"%{query}%"))
        .offset((page - 1) * num_items)
        .limit(num_items)
        .all()
    )
