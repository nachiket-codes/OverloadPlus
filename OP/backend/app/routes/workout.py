from fastapi import APIRouter, Depends, HTTPException, status
from schemas import WorkoutReq, WorkoutUpdateReq
from database import get_db
from commonRouterMethods import getCompleteUser
from oauth import get_user
from sqlalchemy.orm import Session
import models
from datetime import datetime

router = APIRouter(prefix = '/workout', tags = ["Workout"])

# Add day
@router.post('/{splitId}')
async def addWorkout(splitId: str, workoutData: WorkoutReq, currentUser = Depends(get_user), db: Session = Depends(get_db)):
    user = getCompleteUser(currentUser = currentUser, db = db)
    workoutDate = workoutData.workoutDate or datetime.utcnow()
    newWorkout = models.Workout(name = workoutData.name,
                                note = workoutData.note,
                                workoutDate = workoutDate,
                                userId = user.id,
                                splitId = splitId)
    db.add(newWorkout)
    db.commit()
    db.refresh(newWorkout)
    return newWorkout

# Edit day name or note
@router.put('/{splitId}/{workoutId}')
async def editWorkout(splitId: str, workoutId: str, workoutData: WorkoutUpdateReq, currentUser = Depends(get_user), db: Session = Depends(get_db)):
    user = getCompleteUser(currentUser = currentUser, db = db)
    workout = db.query(models.Workout).filter(models.Workout.id == workoutId,
                                              models.Workout.splitId == splitId,
                                              models.Workout.userId == user.id).first()
    if workoutData.name is not None:
        workout.name = workoutData.name

    if workoutData.note is not None:
        workout.note = workoutData.note

    if workoutData.workoutDate is not None:
        workout.workoutDate = workoutData.workoutDate
    
    db.commit()
    db.refresh(workout)
    return workout
    
# Delete a day
@router.delete('/{splitId}/{workoutId}')
async def deleteWorkout(splitId: str, workoutId: str, currentUser = Depends(get_user), db: Session = Depends(get_user)):
    user = getCompleteUser(currentUser = currentUser, db = db)
    workout = db.query(models.Workout).filter(models.Workout.id == workoutId,
                                              models.Workout.userId == user.id,
                                              models.Workout.splitId == splitId).first()
    db.delete(workout)
    db.refresh()
    return {
        "message" : f"Successfully deleted workout with id: {workoutId}"
    }

# get all days
@router.get('/{splitId}')
async def getAllWorkouts(splitId: str, db: Session = Depends(get_db), currentUser = Depends(get_user)):
    user = getCompleteUser(currentUser = currentUser, db = db)
    split = db.query(models.Split).filter(models.Split.id == splitId,
                                          models.Split.userId == user.id).first()
    return split.workouts

# get a day
@router.get('/{splitId}/{workoutId}')
async def getAWorkout(splitId: str, workoutId: str, db: Session = Depends(get_db), currentUser = Depends(get_user)):
    user = getCompleteUser(currentUser = currentUser, db = db)
    workout = db.query(models.Workout).filter(models.Workout.id == workoutId,
                                              models.Workout.userId == user.id,
                                              models.Workout.splitId == splitId).first()
    if not workout:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = {
                "message" : f"No workout day with id : {workoutId} found for user : {user.username}"
            }
        )
    return workout

