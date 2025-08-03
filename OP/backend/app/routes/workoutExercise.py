from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter(prefix = '/workoutExcercise', tags = ["WorkoutExercise"])

# Add an entry
# List an exercise in a workout
# Update a workout exercise