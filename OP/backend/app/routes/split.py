from fastapi import APIRouter, HTTPException, status, Depends
from oauth import get_user
from database import get_db
from schemas import SplitReq, SplitUpdateReq
from sqlalchemy.orm import Session
import models
from commonRouterMethods import getCompleteUser

router = APIRouter(prefix = "/split", tags = ["Split"])

# CREATE A NEW SPIT
@router.post('/')
async def createSplit(splitData: SplitReq, currentUser = Depends(get_user), db : Session = Depends(get_db)):
    user = getCompleteUser(currentUser = currentUser, db = db)
    newSplit = models.Split(
        name = splitData.name,
        description = splitData.description,
        userId = user.id
    )
    db.add(newSplit)
    db.commit()
    db.refresh(newSplit)
    return newSplit

# EDIT A SPLIT
@router.put('/{splitId}')
async def editSplit(splitId: str, splitData: SplitUpdateReq, currentUser = Depends(get_user), db: Session = (get_db)):
    user = getCompleteUser(currentUser = currentUser, db = db)
    split = db.query(models.Split).filter(models.Split.id == splitId).first()
    if not split:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
                            detail = {"message" : f"Split with id : {splitId}, not found"})
    if splitData.name is not None:
        split.name = splitData.name
    if splitData.description is not None:
        split.description = splitData.description
    db.commit()
    db.refresh(split)
    return split


# GET ALL SPLITS ADDED BY THE USER
@router.get('/')
async def getSplits(currentUser = Depends(get_user), db : Session = Depends(get_db)):
    user = getCompleteUser(currentUser = currentUser, db = db)
    return user.splits

# GET A SPLIT
@router.get('/{splitId}')
async def getSplit(splitId: str, db: Session = Depends(get_db), currentUser = Depends(get_user)):
    user = getCompleteUser(currentUser = currentUser, db = db)
    split = db.query(models.Split).filter(models.Split.id == splitId,
                                          models.Split.userId == user.id).first()
    if not split:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = {"message" : f"Split with id : {splitId} not found"}
        )
    return split

# DELETE A SPLIT
@router.delete('/{splitId}')
async def deleteSplit(splitId: str, db: Session = Depends(get_db), currentUser = Depends(get_user)):
    user = getCompleteUser(currentUser = currentUser, db = db)
    split = db.query(models.Split).filter(models.Split.id == splitId,
                                          models.Split.userId == user.id).first()
    if not split:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = {"message" : f"Split with id : {splitId} not found"}
        )
    db.delete(split)
    db.commit()
    return {
        "message" : f"Successfully deleted the split with id : {splitId}"
    }