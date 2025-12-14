from sqlalchemy.orm import Session

from app.schemas.document import *
from app.exceptions.document import *
from app.repositories import document as doc_repository
from app.stores import file_storage


def register_document(db: Session, data: DocumentBase, user_id: int) -> DocumentInfo:
    file_path = file_storage.save(f"origin/{data.title}", data.byte_data)
    document = doc_repository.create_document(
        db, DocumentCreate(title=data.title, file_path=file_path, user_id=user_id)
    )
    return DocumentInfo.model_validate(document)


def get_document_by_id(db: Session, document_id: int) -> DocumentInfo:
    document = doc_repository.get_document_by_id(db, document_id)
    return DocumentInfo.model_validate(document)


def get_documents_by_title(
    db: Session, query: str, page: int, num_items: int
) -> list[DocumentInfo]:
    documents = doc_repository.get_documents_by_title(db, query, page, num_items)
    return [DocumentInfo.model_validate(doc) for doc in documents]
