from openai import OpenAI
from app.cores.config import settings

client = OpenAI(api_key="EMPTY", base_url=settings.VLLM_BASE_URL)


def send_message(message: str) -> str:
    response = client.chat.completions.create(
        model="Qwen/Qwen2.5-0.5B-Instruct",
        messages=[
            {"role": "user", "content": message},
        ],
        max_tokens=256,
        temperature=0.7,
    )
    return response.choices[0].message.content
