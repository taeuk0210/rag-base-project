from pydantic import BaseModel


class DocRegRequest(BaseModel):
    title: str
    file: bytes


class DocRegResponse(BaseModel):
    ok: bool = True
