from fastapi import FastAPI, status
from sentence_transformers import SentenceTransformer

from app.schemas.embed import *

embed_model = SentenceTransformer("dragonkue/bge-m3-ko")

app = FastAPI()


@app.post(
    "/api/v1/embed",
    response_model=EmbedResponse,
    status_code=status.HTTP_201_CREATED,
)
def embed(
    request: EmbedRequest
):
    embed_tensor = embed_model.encode(request.content)
    return EmbedResponse(embedding=embed_tensor.tolist())


@app.get(
    "/health",
    status_code=status.HTTP_200_OK
)
def health():
    return {"status":"ok"}