from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    user_email: EmailStr


class UserCreate(UserBase):
    password: str = Field(min_length=8)


class UserLogin(BaseModel):
    user_email: EmailStr
    password: str


class UserInfo(UserBase):
    user_id: int

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
