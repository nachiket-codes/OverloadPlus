from pydantic import BaseModel
from typing import Optional
from datetime import datetime

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

# --------------SPLIT------------------------
class SplitReq(BaseModel):
    name: str
    description: Optional[str] = None

class SplitUpdateReq(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

#--------------------WORKOUT-----------------
class WorkoutReq(BaseModel):
    name: str
    note: Optional[str] = None
    workoutDate: Optional[datetime] = None

class WorkoutUpdateReq(BaseModel):
    name: Optional[str] = None
    note: Optional[str] = None
    workoutDate: Optional[datetime] = None
