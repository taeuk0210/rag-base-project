import os
from app.core.config import settings


def save(path: str, data: bytes) -> str:
    full_path = os.path.join(settings.FILE_STORAGE_BASE_DIR, path)

    os.makedirs(os.path.dirname(full_path), exist_ok=True)

    with open(full_path, "wb") as f:
        f.write(data)

    return path


def load(key: str) -> bytes:
    full_path = os.path.join(settings.FILE_STORAGE_BASE_DIR, key)

    if not os.path.exists(full_path):
        raise FileNotFoundError(f"File not found: {key}")

    with open(full_path, "rb") as f:
        return f.read()
