import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api";
import { AxiosError } from "axios";

interface Workout {
    id: string,
    name: string
    note?: string
}

interface InitialState {
    workouts: Workout[]
    loading: boolean
    error: string
}

const initialState: InitialState = {
    workouts: [],
    loading: false,
    error: ""
}

export const getWorkouts = createAsyncThunk('workout/get', async (splitId: string, { rejectWithValue }) => {
    try{
        const resp = await API.get(`workout/${splitId}`)
        return resp.data
    }
    catch (err) {
        const error = err as AxiosError
        if (error.response && error.response.data){
            return rejectWithValue((error.response.data as any).detail)
        }
        return rejectWithValue("Failed to get the workouts")
    }
})

interface WorkoutEdit {
    name?: string
    note?: string
}

interface WorkoutEditOut {
    splitId: string
    workoutId: string
    workoutData: WorkoutEdit

}

interface WorkoutAddOut {
    splitId: string
    workoutData: WorkoutEdit
}

export const editWorkout = createAsyncThunk('workout/edit', async (workoutEditData: WorkoutEditOut, { rejectWithValue }) => {
    try{
        const {splitId, workoutId, workoutData } = workoutEditData
        const resp = await API.put(`workout/${splitId}/${workoutId}`, workoutData)
        return resp.data
    }
    catch (err) {
        const error = err as AxiosError
        if (error.response && error.response.data){
            return rejectWithValue((error.response.data as any).detail)
        }
        return rejectWithValue("Failed to edit the workout")
    }
})

export const addAWorkout = createAsyncThunk('workout/add', async (workoutAddData: WorkoutAddOut, { rejectWithValue }) => {
    try{
        const {splitId, workoutData } = workoutAddData
        const resp = await API.post(`workout/${splitId}`, workoutData)
        return resp.data
    }
    catch (err) {
        const error = err as AxiosError
        if (error.response && error.response.data){
            return rejectWithValue((error.response.data as any).detail)
        }
        return rejectWithValue("Failed to add the workout")
    }
})

interface DeleteWorkoutType {
    splitId: string
    workoutId: string
}

export const deleteWorkout = createAsyncThunk('workout/delete', async (deleteWorkoutData: DeleteWorkoutType, { rejectWithValue }) => {
    try{
        const {splitId, workoutId } = deleteWorkoutData
        const resp = await API.delete(`workout/${splitId}/${workoutId}`)
        return resp.data
    }
    catch (err) {
        const error = err as AxiosError
        if (error.response && error.response.data){
            return rejectWithValue((error.response.data as any).detail)
        }
        return rejectWithValue("Failed to delete the workout")
    }
})

const WorkoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase(getWorkouts.fulfilled, (state, action) => {
            state.workouts = action.payload
            state.loading = false
        }).addCase(getWorkouts.pending, (state, action) => {
            state.loading = true
        }).addCase(getWorkouts.rejected, (state, action) => {
            state.loading = false
            state.error = (action.payload as { message: string})?.message || "Could not get the workouts"
        }).addCase(editWorkout.fulfilled, (state, action) => {
            state.loading = false
        }).addCase(editWorkout.pending, (state, action) => {
            state.loading = true
        }).addCase(editWorkout.rejected, (state, action) => {
            state.loading = false
            state.error = (action.payload as { message: string})?.message || "Could not edit the workout"
        }).addCase(addAWorkout.fulfilled, (state, action) => {
            state.loading = false
        }).addCase(addAWorkout.pending, (state, action) => {
            state.loading = true
        }).addCase(addAWorkout.rejected, (state, action) => {
            state.loading = false
            state.error = (action.payload as { message: string})?.message || "Could not add the workout"
        }).addCase(deleteWorkout.fulfilled, (state, action) => {
            state.loading = false
        }).addCase(deleteWorkout.pending, (state, action) => {
            state.loading = true
        }).addCase(deleteWorkout.rejected, (state, action) => {
            state.loading = false
            state.error = (action.payload as { message: string})?.message || "Could not delete the workout"
        })
    }
})

export default WorkoutSlice.reducer