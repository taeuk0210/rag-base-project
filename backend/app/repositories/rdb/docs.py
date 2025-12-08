from typing import Optional

from sqlalchemy.orm import Session

from app.schemas.docs import DocumentCreate, DocumentInfo
from app.models.docs import Document


def get_document_by_id(db: Session, document_id: int) -> Optional[Document]:
    return db.query(Document).filter(Document.document_id == document_id).first()


def create_document(db: Session, data: DocumentCreate) -> Document:
    doc = Document(title=data.title, file_path=data.file_path, user_id=data.user_id)
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc
