
### 1. 전체 구조 & Router 컨벤션
**📁 구조 예시**
```bash
app/
  core/         # 공통 설정, 미들웨어, config
  api/
    v1/
      router.py # version 단위 Router 집계
      endpoints/
        inference.py
        health.py
  services/     # LLM, Embedding 클라이언트/비즈니스 로직
  schemas/      # Pydantic 모델들
  config.py
  main.py
```
**🔗 Router 패턴**

APIRouter + prefix + tags 조합이 거의 표준
```python
# app/api/v1/endpoints/inference.py
from fastapi import APIRouter, Depends
from app.schemas.inference import ChatRequest, ChatResponse
from app.services.chat_service import ChatService, get_chat_service

router = APIRouter()

@router.post(
    "/chat/completions",
    response_model=ChatResponse,
    summary="LLM Chat Completion",
)
async def create_chat_completion(
    payload: ChatRequest,
    svc: ChatService = Depends(get_chat_service),
):
    return await svc.generate(payload)
```
```python
# app/api/v1/router.py
from fastapi import APIRouter
from app.api.v1.endpoints import inference, health

api_v1_router = APIRouter(prefix="/api/v1")

api_v1_router.include_router(inference.router, prefix="/inference", tags=["inference"])
api_v1_router.include_router(health.router, prefix="/health", tags=["health"])
```
### 2. 타입 힌트 & 어노테이션 스타일
**✅ 기본 스타일**

- 함수 파라미터/리턴 모두 타입 명시  
- I/O는 Pydantic BaseModel로 통일
- DI는 Depends() 사용

```python
from typing import List, Literal, Optional
from pydantic import BaseModel, Field

class Message(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str

class ChatRequest(BaseModel):
    model: str = Field(..., description="Model name")
    messages: List[Message]
    temperature: float = 0.7
    max_tokens: int = 512

class ChatResponse(BaseModel):
    id: str
    model: str
    output: str
    finish_reason: str
```

리턴 타입도 명시:
```python
from fastapi import status

@router.post(
    "/chat/completions",
    response_model=ChatResponse,
    status_code=status.HTTP_200_OK,
)
async def create_chat_completion(...) -> ChatResponse:
    ...
```

### 3. 입력/출력 스키마 컨벤션 (AI 게이트웨이용)
**📥 인풋 스타일 (추천)**

OpenAI 스타일 따라가는 게 제일 무난함

공통 필드:
- model
- input or messages
- parameters(temperature, top_p, max_tokens 등)
- metadata(trace id, user id 등)
```python
class EmbeddingRequest(BaseModel):
    model: str
    input: list[str]  # 배치 처리 기본
    user: Optional[str] = None
```

**📤 아웃풋 스타일**

공통 필드:
- id (요청 ID)
- model
- data (배열)
- usage (token/stat info)
- created (timestamp)
```python
class EmbeddingItem(BaseModel):
    index: int
    embedding: list[float]

class Usage(BaseModel):
    prompt_tokens: int
    total_tokens: int

class EmbeddingResponse(BaseModel):
    id: str
    model: str
    data: list[EmbeddingItem]
    usage: Usage
    created: int
```

👉 이렇게 해두면 LLM/Embedding/Rerank 전부 동일 패턴으로 관리 가능.

### 4. DI / Service 분리 컨벤션
**✂ 서비스 레이어 분리**

엔드포인트는 “입출력 + HTTP만” 처리 실제 LLM/Vector/서드파티 호출은 services/ 에서

```python
# app/services/chat_service.py
from app.schemas.inference import ChatRequest, ChatResponse

class ChatService:
    def __init__(self, llm_client: "LLMClient"):
        self.llm_client = llm_client

    async def generate(self, payload: ChatRequest) -> ChatResponse:
        llm_result = await self.llm_client.chat(payload)
        return ChatResponse(
            id=llm_result.id,
            model=payload.model,
            output=llm_result.output,
            finish_reason=llm_result.finish_reason,
        )

def get_chat_service() -> ChatService:
    # 나중에 DI 컨테이너로 교체 가능
    from app.clients.llm_client import LLMClient
    client = LLMClient()
    return ChatService(client)
```

엔드포인트에서는 항상 Depends(get_chat_service) 사용

### 5. 에러/예외 응답 컨벤션
**🧱 공통 에러 응답 스키마**
```python
class ErrorResponse(BaseModel):
    code: str
    message: str
    details: Optional[dict] = None
```
HTTPException + 전역 핸들러
```python
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from fastapi import FastAPI

app = FastAPI()

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(
            code="INTERNAL_SERVER_ERROR",
            message="Unexpected error",
        ).model_dump(),
    )
```

도메인 에러(LLM 타임아웃 등)는 커스텀 예외 정의해서 4xx/5xx 분리

### 6. 코드 스타일 (함수/파일/네이밍)

**파일명: snake_case**
- chat_service.py, embedding_client.py, inference.py

**클래스명: PascalCase**
- ChatService, EmbeddingClient

**엔드포인트 함수:**
- 의미 + HTTP 메서드 조합
- create_chat_completion, get_model_list, health_check 등

**엔드포인트 한 함수에:**
- 파라미터 수 최소화
- 바디는 무조건 BaseModel 하나로 묶기
```python
@router.post("/embeddings", response_model=EmbeddingResponse)
async def create_embeddings(
    payload: EmbeddingRequest,
    svc: EmbeddingService = Depends(get_embedding_service),
) -> EmbeddingResponse:
    return await svc.embed(payload)
```
### 7. 미들웨어 & 공통 처리 (AI 게이트웨이에서 거의 필수)
**1) 요청/응답 로깅 + trace_id**
```python
from starlette.middleware.base import BaseHTTPMiddleware
import time, uuid
import logging

logger = logging.getLogger(__name__)

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        trace_id = request.headers.get("X-Trace-Id", str(uuid.uuid4()))
        request.state.trace_id = trace_id

        start = time.time()
        response = await call_next(request)
        duration = time.time() - start

        logger.info(
            f"[{trace_id}] {request.method} {request.url.path} "
            f"status={response.status_code} duration={duration:.3f}s"
        )
        response.headers["X-Trace-Id"] = trace_id
        return response

app.add_middleware(LoggingMiddleware)
```
**2) CORS**
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # 환경에 따라 조정
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
### 8. AI 서빙 게이트웨이 특화 팁
**🔹 1) 배치 입력 기본**
- Embedding / rerank / scoring API는 단일 input보다 리스트가 기본
```python
class RerankRequest(BaseModel):
    query: str
    documents: list[str]
```
**🔹 2) timeout / retry 정책은 서비스 레이어에서**
- FastAPI 레벨이 아니라 LLMClient 에서 httpx.AsyncClient(timeout=...) 사용

**🔹 3) 스트리밍 응답 (LLM)**
- 나중에 필요하면 StreamingResponse 패턴 사용
- 처음 버전은 비스트리밍으로 단순하게 시작 → 이후 확장

**🔹 4) 버전별 분리**
- /api/v1/... /api/v2/... 구조로 schema 변경을 제어
- 같은 path라도 모델만 바뀔 수 있게 설계

### 요약 정리
1. AI 서빙 게이트웨이 FastAPI에서 “많이 쓰는/유용한” 컨벤션은:
2. APIRouter + prefix + tags + 버전(/api/v1)
3. 모든 I/O를 Pydantic 모델로 (OpenAI 스타일 스키마 추천)
4. 서비스 레이어 분리 + Depends() 로 DI
5. response_model, status_code를 데코레이터에서 명시
6. 공통 ErrorResponse + 전역 예외 핸들러
7. 로깅/trace-id/CORS 같은 공통 처리 미들웨어
8. Embedding/Rerank는 배치 입력이 기본, LLM은 OpenAI 비슷한 messages 패턴