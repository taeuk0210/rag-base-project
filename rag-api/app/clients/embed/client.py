import httpx

from app.cores.config import settings

client = httpx.AsyncClient(base_url=settings.EMBED_BASE_URL, timeout=httpx.Timeout(30))


async def get_embedding(content: str) -> list[float]:
    response = await client.post("/api/v1/embed", json={"content": content})
    return response.json()["embedding"]
