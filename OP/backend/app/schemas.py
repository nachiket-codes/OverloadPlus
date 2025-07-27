from pydantic import BaseModel

class LoginData(BaseModel):
    username: str
    password: str

class UserRegisterReq(LoginData):
    email: str

class TokenData(BaseModel):
    username: str | None = None

class ForgotPwdReq(BaseModel):
    username: str

class ResetPwdReq(BaseModel):
    password: str
    token: str

class GoogleToken(BaseModel):
    token: str