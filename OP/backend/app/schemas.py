from pydantic import BaseModel

class LoginData(BaseModel):
    username: str
    password: str

class UserRegisterReq(LoginData):
    email: str

class TokenData(BaseModel):
    username: str | None = None

class ForgotPwdReq(BaseModel):
    email: str

class ResetPwdReq(BaseModel):
    password: str
    token: str