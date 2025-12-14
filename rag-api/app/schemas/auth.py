from pydantic import BaseModel, EmailStr, Field


class SignupRequest(BaseModel):
    user_email: EmailStr
    password: str = Field(min_length=8)


class SignupResponse(BaseModel):
    ok: bool = True


class LoginRequest(SignupRequest):
    pass


class LoginResponse(SignupResponse):
    pass
