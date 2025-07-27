import os
from fastapi import APIRouter, Depends, HTTPException, status, Request
from database import get_db
from sqlalchemy import or_
from sqlalchemy.orm import Session
from hashingFile import verify
from schemas import LoginData, ForgotPwdReq, ResetPwdReq, GoogleToken
from authentication import createAccessToken, verifyAccessToken
import models
from fastapi.security import OAuth2PasswordRequestForm
from oauth import oauthG
import hashingFile
import emailHandler
from google.oauth2 import id_token
from google.auth.transport import requests


router = APIRouter(prefix = '/auth', tags = ["Authentication"])

# Normal login using JWT-------------------------------------------------------------------
@router.post('/login')
async def login(loginData: LoginData, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(
        or_(
            models.User.username == loginData.username,
            models.User.email == loginData.username
        )
    ).first()
    if not user:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail= {"message" : "Wrong credentials!"})

    if not verify(loginData.password, user.password):
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail= {"message" : "Wrong credentials!"})
    tokenStr = createAccessToken({'sub' : user.username})
    return {
        "id" : user.id,
        "username" : user.username,
        "email" : user.email,
        "token" : tokenStr
    }
    
# Google auth login -------------------------------------------------------------------------
def verify_google_token(token: str):
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), os.getenv('GOOGLE_CLIENT_ID'))

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise HTTPException(status_code=400, detail="Invalid token issuer")

        return {
            "email": idinfo['email'],
            "name": idinfo.get('name', ''),
            "sub": idinfo['sub'],
        }

    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid Google token")

@router.post("/google")
def google_auth(googleToken: GoogleToken, db: Session = Depends(get_db)):
    user_info = verify_google_token(googleToken.token)

    user = db.query(models.User).filter(models.User.email == user_info["email"]).first()

    if not user:
        user = models.User(
            email=user_info["email"],
            username=user_info["name"],
            provider='google'  # optional field if you want to track
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    tokenStr = createAccessToken(data = {'sub' : user.username})
    return {"access_token" : tokenStr, "token_type" : "bearer" }

#------------ Forgot pasword -------------------------------------------------------
@router.post('/forgot-pwd')
async def forgotPassword(userData: ForgotPwdReq, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(
        or_(
            models.User.username == userData.username,
            models.User.email == userData.username
        )
    ).first()
    if not user:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = {"message" : "This email is not registered!"}
        )
    
    tokenStr = createAccessToken(data = {'sub' : user.username})
    emailHandler.sendResetPwdLink(toEmail = user.email, token = tokenStr)
    return {"message": "Password reset link sent"}

@router.post('/reset-pwd')
async def resetPassword(resetPwdData: ResetPwdReq, db: Session = Depends(get_db)):
    tokenData = verifyAccessToken(token = resetPwdData.token)
    user = db.query(models.User).filter(models.User.username == tokenData.username).first()
    user.password = hashingFile.hash(resetPwdData.password)
    db.commit()
    db.refresh(user)
    return {"message": "Password sucessfully reset"}
