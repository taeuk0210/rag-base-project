from datetime import datetime

from sqlalchemy import String, DateTime, func, Integer
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    """Base ORM Model"""

    pass


class Document(Base):
    __tablename__ = "document_infos"
    __table_args__ = {"schema": "bnasvc"}

    # PK
    document_id: Mapped[int] = mapped_column(primary_key=True, index=True)

    # 기본 정보
    title: Mapped[str] = mapped_column(String(255), unique=False)
    file_path: Mapped[str] = mapped_column(String(255), unique=False)
    user_id: Mapped[str] = mapped_column(Integer, nullable=False)

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
        return f"Document(id={self.document_id}, title={self.title})"
