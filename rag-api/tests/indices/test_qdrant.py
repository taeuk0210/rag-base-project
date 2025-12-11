import pytest
import PyPDF2

from app.clients.embed import client
from app.indices import qdrant


@pytest.mark.asyncio
async def test_upsert_documents():
    reader = PyPDF2.PdfReader("tests/samples/document.pdf")
    for chunk_id, page in enumerate(reader.pages[:10]):
        text = page.extract_text()
        embedding = await client.get_embedding(text)
        response = qdrant.upsert_documents(chunk_id, embedding, text[:100])
        assert str(response.status) == "completed"
