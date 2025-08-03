from fastapi import APIRouter, Depends, HTTPException, status
from oauth import get_user
from database import get_db
from routes.commonRouterMethods import getCompleteUser
from sqlalchemy.orm import Session
import models

router = APIRouter(prefix = "/exercise", tags = ["Exercise"])

# Get all exercises
@router.get('/')
async def getAllExercises(currentUser = Depends(get_user), db: Session = Depends(get_db)):
    user = getCompleteUser(currentUser = currentUser, db = db)
    return db.query(models.Exercise).all()

# Get an exercise detail
@router.get('/{exerciseId}')
async def getExercise(exerciseId: str, currentUser = Depends(get_user), db: Session = Depends(get_db)):
    user = getCompleteUser(currentUser, db)
    exercise = db.query(models.Exercise).filter(models.Exercise.id == exerciseId).first()
    if not exercise:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = {"message": f"No exercise found for id : {exerciseId}"}
        )
    