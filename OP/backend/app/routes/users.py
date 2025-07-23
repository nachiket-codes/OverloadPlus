from fastapi import APIRouter, HTTPException, status, Depends
from schemas import UserRegisterReq
from database import get_db
from sqlalchemy import or_
from sqlalchemy.orm import Session
import models
import hashingFile
from authentication import createAccessToken
from oauth import get_user
from schemas import TokenData

router = APIRouter(prefix='/user', tags = ["User"])

@router.post('/')
async def add_user(userData: UserRegisterReq, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(
        or_(
            models.User.username == userData.username,
            models.User.email == userData.email
        )
    ).first()
    if user:
        raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST,
                            detail = {"message" : "User already exists!"})
    
    newUser = models.User(
        username = userData.username,
        email = userData.email,
        password = hashingFile.hash(userData.password)
    )
    db.add(newUser)
    db.commit()
    db.refresh(newUser)
    tokenStr = createAccessToken({'sub' : newUser.username})
    return {
        'id' : newUser.id,
        'username' : newUser.username,
        'email' : newUser.email,
        'token' : tokenStr
    }

@router.get('/')
async def get_current_user(tokenData: TokenData = Depends(get_user), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == tokenData.username).first()
    if not user:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail = {"message" : "Unauthorized access"})

    tokenStr = createAccessToken({'sub' : user.username})
    return {
        "id": user.id,
        "username" : user.username,
        "email" : user.email,
        "token" : tokenStr
    }


