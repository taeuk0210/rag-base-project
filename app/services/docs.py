from sqlalchemy.orm import Session

from app.schemas.docs import *
from app.exceptions.docs import * 
from app.repositories.rdb import docs
from app.repositories.obs import file_storage


def register_document(db: Session, data: DocumentBase, user_id: int) -> DocumentInfo:
    file_path = file_storage.save(f"docs/{data.title}", data.byte_data)
    doc = docs.create_document(db, DocumentCreate(
        title=data.title,
        file_path=file_path,
        user_id=user_id))
    return DocumentInfo.model_validate(doc)


def get_document_by_id(db: Session, document_id: int) -> DocumentInfo:
    doc = docs.get_document_by_id(db, document_id)
    return DocumentInfo.model_validate(doc)
