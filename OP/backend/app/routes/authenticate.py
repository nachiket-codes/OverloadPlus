import os
from fastapi import APIRouter, Depends, HTTPException, status, Request
from database import get_db
from sqlalchemy import or_
from sqlalchemy.orm import Session
from hashingFile import verify
from schemas import LoginData, ForgotPwdReq, ResetPwdReq
from authentication import createAccessToken, verifyAccessToken
import models
from fastapi.security import OAuth2PasswordRequestForm
from oauth import oauthG
import hashingFile
import emailHandler


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
@router.get('/google')
async def loginWithGoogle(request: Request):
    redirectUrl = str(request.base_url)[:-1] + str(request.url_for('googleCallback'))
    return await oauthG.google.authorize_redirect(request, redirectUrl)

@router.get('/google/callback')
async def googleCallback(request: Request, db: Session = Depends(get_db)):
    token = await oauthG.google.authorize_access_token(request)

    # SAFETY CHECK
    if 'id_token' not in token:
        return {"error": "id_token missing from Google response", "token": token}

    try:
        user_info = await oauthG.google.parse_id_token(request, token)
    except Exception as e:
        resp = await oauthG.google.get('userinfo', token=token)
        user_info = resp.json()
    email = user_info.get("email")
    username = user_info.get("name")

    # Check if user already exists
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        user = models.User(
            username = username,
            email = email,
            provider = "google"
        )

        db.add(user)
        db.commit()
        db.refresh(user)
    
    # Create JWT token
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
