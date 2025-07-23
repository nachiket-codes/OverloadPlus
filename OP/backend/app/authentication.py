from jose import jwt
from datetime import datetime, timedelta
import os
from fastapi import HTTPException, status
from schemas import TokenData

def createAccessToken(data: dict, exp: timedelta = None):
    toEncode = data.copy()
    if exp:
        expiresDelta = datetime.utcnow() + exp
    else:
        expiresDelta = datetime.utcnow() + timedelta(minutes=int(os.getenv('EXPIRES_MINS')))
    
    toEncode.update({'exp' : expiresDelta})
    return jwt.encode(claims = toEncode, key = os.getenv('SECRET_KEY'), algorithm = os.getenv('ALGORITHM'))

def verifyAccessToken(token: str):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token = token, key = os.getenv('SECRET_KEY'), algorithms = [os.getenv('ALGORITHM')])
        username = payload.get('sub', None)
        if not username:
            raise credentials_exception
        return TokenData(username = username)
    except Exception:
        raise credentials_exception
    
