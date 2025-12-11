from typing import List
from pydantic import BaseModel


class EmbedRequest(BaseModel):
    content: str


class EmbedResponse(BaseModel):
    embedding: List[float]

