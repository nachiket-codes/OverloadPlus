import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authenticateSlice'
import splitReducer from './features/splitSlice'
import workoutReducer from './features/WorkoutSlice'
import exerciseReducer from './features/exercisesSlice'

export const store = configureStore({
    reducer : {
        authentication : authReducer,
        splits: splitReducer,
        workouts: workoutReducer,
        exercises: exerciseReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
