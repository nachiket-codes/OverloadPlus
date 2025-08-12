from database import Base
from sqlalchemy import Column, String, DateTime, Text, ForeignKey, Integer, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy.dialects.mssql import UNIQUEIDENTIFIER
import uuid

class User(Base):
    __tablename__ = "user"

    # id = Column(UNIQUEIDENTIFIER, primary_key=True, default=uuid.uuid4, nullable=False)
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), nullable=False)
    username = Column(String(50), unique = True, nullable = False)
    email = Column(String(50), unique = True, nullable = False)
    password =  Column(String(255), nullable = True)
    provider = Column(String, default="local")
    createdAt = Column(DateTime, default = datetime.utcnow)

    splits = relationship("Split", back_populates = "user", cascade = "all, delete-orphan")
    workouts = relationship("Workout", back_populates = "user", cascade = "all, delete-orphan")
    progressMetrics = relationship("ProgressMetric", back_populates = "user", cascade = "all, delete-orphan")

class Split(Base):
    __tablename__ = "split"

    id = Column(String(36), primary_key = True, default = lambda: str(uuid.uuid4()), nullable = False)
    name = Column(String(100), nullable = False)
    description = Column(Text)
    createdAt = Column(DateTime, default = datetime.utcnow)
    userId = Column(String(36), ForeignKey("user.id"), nullable = False)

    user = relationship('User', back_populates = "splits")
    workouts = relationship('Workout', back_populates = "split")

class Workout(Base):
    __tablename__ = "workout"

    id = Column(String(36), primary_key = True, nullable = False, default = lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable = False)
    note = Column(Text)
    createdAt = Column(DateTime, default = datetime.utcnow)
    workoutDate = Column(DateTime, default = datetime.utcnow)
    userId = Column(String(36), ForeignKey("user.id"), nullable = False)
    splitId = Column(String(36), ForeignKey("split.id"), nullable = False)

    user = relationship('User', back_populates = "workouts")
    split = relationship('Split', back_populates = "workouts")

    workoutExercises = relationship("WorkoutExercise", back_populates = "workout", cascade = "all, delete-orphan")

class Exercise(Base):
    __tablename__ = "exercise"

    id = Column(String(36), primary_key = True, nullable = False, default = lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable = False)
    category = Column(String(50))
    muscle_group = Column(String(50))
    equipment = Column(String(50))
    instructions = Column(Text)

    workoutExercises = relationship("WorkoutExercise", back_populates = "exercise")
    progressMetrics = relationship("ProgressMetric", back_populates = "exercise")

class WorkoutExercise(Base):
    __tablename__ =  "workoutExercise"

    id = Column(String(36), primary_key = True, nullable = False, default = lambda: str(uuid.uuid4()))
    orderInWorkout = Column(Integer)
    exerciseId = Column(String(36), ForeignKey("exercise.id"), nullable = False)
    workoutId = Column(String(36), ForeignKey("workout.id"), nullable = False)

    workout = relationship("Workout", back_populates = "workoutExercises")
    exercise = relationship("Exercise", back_populates = "workoutExercises")

    sets = relationship("Set", back_populates = "workoutExercise")

class Set(Base):
    __tablename__ =  "set"

    id = Column(String(36), primary_key = True, nullable = False, default = lambda: str(uuid.uuid4()))
    setNumber = Column(Integer)
    weight = Column(Float, nullable = False)
    reps = Column(Integer, nullable = False)
    rpe = Column(Float)
    weightUnit = Column(String(10), nullable = False)
    workoutExerciseId = Column(String(36), ForeignKey('workoutExercise.id'), nullable = False)

    workoutExercise = relationship("WorkoutExercise", back_populates = "sets")

class ProgressMetric(Base):
    __tablename__ =  "progressMetric"

    id = Column(String(36), primary_key = True, nullable = False, default = lambda: str(uuid.uuid4()))

    userId = Column(String(36), ForeignKey('user.id'), nullable=False)
    exerciseId = Column(String(36), ForeignKey('exercise.id'), nullable=False)
    date = Column(DateTime, nullable=False)
    maxWeight = Column(Float)
    totalVolume = Column(Float)
    totalReps = Column(Integer)

    user = relationship("User", back_populates="progressMetrics")
    exercise = relationship("Exercise", back_populates="progressMetrics")



