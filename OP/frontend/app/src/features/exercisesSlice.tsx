import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import API from "../api"
import { AxiosError } from "axios"

interface Exercise {
    id: string
    name: string
    category: string
    muscle_group: string
    equipment: string
    instructions: string
}

interface InitialState {
    exercises : Exercise[]
    loading: boolean
    error : string
}

const initialState: InitialState = {
    exercises : [],
    loading: false,
    error: ''
}

export const getExercises = createAsyncThunk('exercises/get', async (_, {rejectWithValue}) => {
    try {
        const resp = await API.get('/exercise');
        return resp.data;
    }
    catch (err) {
        const error = err as AxiosError;
        if (error.response && error.response.data) {
            return rejectWithValue((error.response.data as any).detail)
        }
        return rejectWithValue("Could not get the exercises!")
    }
})

const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase(getExercises.fulfilled, (state, action) => {
            state.exercises = action.payload
            state.loading = false
        }).addCase(getExercises.pending, (state) => {
            state.loading = true
        }).addCase(getExercises.rejected, (state, action) => {
            state.loading = false
            state.error = (action.payload as { message: string})?.message || "Could not get the exercises"
        })
    }
})

export default exerciseSlice.reducer;