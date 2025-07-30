from fastapi import HTTPException, status
import models

def getCompleteUser(currentUser, db):
    user = db.query(models.User).filter(models.User.username == currentUser.username).first()
    if not user:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail = {"message" : "Unauthorized access!"})
    return user