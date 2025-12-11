from typing import Any

from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance

from app.cores.config import settings

client = QdrantClient(settings.QDRANT_BASE_URL)


def create_or_skip_collection(collection_name: str):
    collections = client.get_collections().collections
    exists = any(c.name == collection_name for c in collections)

    if exists:
        return

    client.create_collection(
        collection_name=collection_name,
        vectors_config=VectorParams(size=1024, distance=Distance.COSINE),
    )
    return


create_or_skip_collection("documents")


def upsert_documents(chunk_id: int, embedding: list[float], text: str) -> None:
    return client.upsert(
        collection_name="documents",
        points=[
            {
                "id": chunk_id,
                "vector": embedding,
                "payload": {"text": text},
            }
        ],
    )


def search_documents(embedding: list[float]) -> Any:
    return client.search(collection_name="documents", query_vector=embedding, limit=5)
