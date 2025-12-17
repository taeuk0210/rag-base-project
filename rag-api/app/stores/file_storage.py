import os
from app.cores.config import settings


def save(title: str, data: bytes) -> str:
    file_url = os.path.join(settings.FILE_STORAGE_BASE_DIR, title)

    os.makedirs(os.path.dirname(file_url), exist_ok=True)

    with open(file_url, "wb") as f:
        f.write(data)

    return file_url


def load(key: str) -> bytes:
    full_path = os.path.join(settings.FILE_STORAGE_BASE_DIR, key)

    if not os.path.exists(full_path):
        raise FileNotFoundError(f"File not found: {key}")

    with open(full_path, "rb") as f:
        return f.read()
