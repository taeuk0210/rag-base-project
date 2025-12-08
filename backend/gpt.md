✅ 1. 전체 폴더 구조 (권장 구조)
app/
  api/
    v1/
      endpoints/
        users.py          # 유저 API 라우터 (복수형)
  core/
    config.py             # Settings(BaseSettings) 환경 설정
    database.py           # 엔진/세션/get_db
    security.py           # JWT, password hashing 등
  deps/
    users.py              # DI용 Depends 함수 (ex: get_user_service)
  models/
    user.py               # SQLAlchemy User 엔티티 (단수형)
  repositories/
    rdb/
      user_repository.py  # DB CRUD (단수명)
  schemas/
    users.py              # Pydantic DTO (복수형)
  services/
    user.py               # User 비즈니스 로직 (단수형)

원칙

라우터/스키마는 “묶음”이므로 복수형

엔티티/서비스/레포지토리는 “개별 단위”이므로 단수형

디렉토리 이름은 역할 중심

models: 엔티티

schemas: DTO

services: 비즈니스 로직

repositories: DB 액세스

core: 전역 설정/엔진

deps: 의존성 주입용 함수

✅ 2. 파일 단위 네이밍 규칙
✔ 모델(SQLAlchemy)

파일: user.py

클래스: User

테이블명: user_infos (snake_case)

스키마명: bnasvc (snake_case 추천)

✔ 스키마(Pydantic)

파일: users.py

DTO 네이밍: User + 용도

입력(In): UserCreate, UserLogin, UserUpdate

출력(Out): UserInfo, UserMe, UserSummary, UserDetail

Request/Response suffix는 붙이지 않음 (불필요하게 김)

✔ 라우터

파일: users.py

Router name: router = APIRouter(prefix="/users")

✅ 3. DTO(Pydantic) 네이밍 규칙
기본 규칙

snake_case 필드명

PascalCase 클래스명

용도 기반 네이밍

생성: UserCreate

로그인: UserLogin

응답: UserInfo

상세조회: UserDetail

예시
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserInfo(BaseModel):
    id: int
    email: EmailStr
    
✅ 4. SQLAlchemy 모델(Mapped) 규칙
✔ 기본 규칙

Mapped[PythonType] = mapped_column(SQLType)

Python 타입과 SQL 타입은 의미적으로 매칭되어야 함

snake_case 사용

datetime → DateTime(timezone=True)

schema 지정은 __table_args__

예시
class User(Base):
    __tablename__ = "user_infos"
    __table_args__ = {"schema": "bnasvc"}

    user_id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    password_hash: Mapped[str] = mapped_column(String(255))

✅ 5. Settings(config.py) 규칙

BaseSettings 사용

.env 자동 매핑

DB URL은 property로 생성

snake_case 환경 변수

class Settings(BaseSettings):
    DB_HOST: str
    DB_PORT: int = 5432

    @property
    def DATABASE_URL(self):
        return f"postgresql+psycopg://{self.DB_HOST}:{self.DB_PORT}/..."

✅ 6. DB 엔진/세션 규칙(database.py)

전역 싱글턴 엔진

get_db()는 yield로 세션을 의존성 주입

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

✅ 7. DI (deps/) 규칙

FastAPI의 Depends()를 이용

서비스 또는 레포지토리를 주입

def get_user_service(db: Session = Depends(get_db)):
    return UserService(db)


라우터에서는:

@router.post("")
def create_user(
    data: UserCreate,
    service: UserService = Depends(get_user_service)
):
    return service.create_user(data)

✅ 8. Pydantic v2의 model_validate 사용 규칙

입력 객체 타입이 같을 필요 없음

DTO가 가진 필드만 대응되면 됨

SQLAlchemy 모델, dict, 다른 Pydantic 모델 모두 OK

return UserInfo.model_validate(user_entity)