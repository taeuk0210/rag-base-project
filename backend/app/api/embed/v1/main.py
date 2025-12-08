from fastapi import FastAPI

app = FastAPI()


@app.get("api/v1/embed")
def embed():
    return None
