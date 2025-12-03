from datetime import datetime

from sqlalchemy import String, DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    """Base ORM Model"""
    pass


class User(Base):
    __tablename__ = "user_infos"
    __table_args__ = {"schema": "bnasvc"}

    # PK
    user_id: Mapped[int] = mapped_column(primary_key=True, index=True)

    # 기본 정보
    user_email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)

    # 생성/수정 시간
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    def __repr__(self) -> str:
        return f"User(id={self.user_id}, email={self.user_email!r})"
