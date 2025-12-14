from pydantic import BaseModel, EmailStr, Field


class SignupRequest(BaseModel):
    email: EmailStr
    password: str


class SignupResponse(BaseModel):
    ok: bool = True


class LoginRequest(SignupRequest):
    pass


class LoginResponse(SignupResponse):
    pass
