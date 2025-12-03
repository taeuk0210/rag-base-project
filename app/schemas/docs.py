from pydantic import BaseModel


class DocumentBase(BaseModel):
    title: str
    byte_data: bytes


class DocumentCreate(BaseModel):
    title: str
    file_path: str
    user_id: int


class DocumentInfo(DocumentCreate):
    document_id: int

    class Config:
        from_attributes = True