from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from routes import users, authenticate, split, exercises, workout, workoutExercise
from database import Base, engine
from oauth import get_user
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

Base.metadata.create_all(bind = engine)

app.add_middleware(SessionMiddleware, secret_key = os.getenv('SUPER_SECRET'))
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000",               # Dev
                    "https://www.overloadplus.fun"],
    allow_credentials = True,
    allow_headers = ["*"],
    allow_methods = ["*"]
)

app.include_router(users.router)
app.include_router(authenticate.router)
app.include_router(split.router)
app.include_router(exercises.router)
app.include_router(workout.router)
app.include_router(workoutExercise.router)

@app.get('/')
async def home(user = Depends(get_user)):
    print(user)
    return {"message" : "Hello!"}

