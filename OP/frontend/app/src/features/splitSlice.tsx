import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api";
import { AxiosError } from "axios";

interface Split {
    id: string
    name: string
    description: string
    workouts: WorkoutObj[]
}
interface InitialState {
    splits: Split[]
    loading: boolean
    error: string
}

const initialState: InitialState = {
    splits : [],
    loading: false,
    error: ""
}

interface  WorkoutObj {
    name: string
}

interface SplitData {
    name: string
    description: string
    workouts : WorkoutObj[]
}

export const addSplit = createAsyncThunk('split/add', async (splitData: SplitData, { rejectWithValue }) => {
    try {
        const resp = await API.post('/split', splitData)
        return resp.data;
    }
    catch (err) {
        const error = err as AxiosError
        if (error.response && error.response.data) {
            return rejectWithValue((error.response.data as any).detail)
        }
        return rejectWithValue("Failed to add the split!")
    }
})

export const getSplits = createAsyncThunk('split/get', async (_, {rejectWithValue}) => {
    try {
        const resp = await API.get('/split')
        return resp.data
    }
    catch (err) {
        const error = err as AxiosError;

        if (error.response && error.response.data){
            return rejectWithValue((error.response.data as any).detail)
        }
        return rejectWithValue("Could not get the Splits")
    }
})

export const deleteSplits = createAsyncThunk('split/delete', async (id: string, {rejectWithValue}) => {
    try {
        const resp = await API.delete(`split/${id}`)
        return resp.data
    }
    catch (err) {
        const error = err as AxiosError;

        if (error.response && error.response.data){
            return rejectWithValue((error.response.data as any).detail)
        }
        return rejectWithValue("Failed to delete the split")
    }
})

const SplitSlice = createSlice({
    name: "split",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addSplit.fulfilled, (state) => {
            state.loading = false
        }).addCase(addSplit.pending, (state) => {
            state.loading = true
        }).addCase(addSplit.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as { message: string})?.message || "Could not add the split"
        }).addCase(getSplits.fulfilled, (state, action) => {
            state.loading = false
            state.splits = action.payload
        }).addCase(getSplits.pending, (state) => {
            state.loading = true
        }).addCase(getSplits.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as { message: string})?.message || "Could not get the splits"
        }).addCase(deleteSplits.fulfilled, (state) => {
            state.loading = false
        }).addCase(deleteSplits.pending, (state) => {
            state.loading = true
        }).addCase(deleteSplits.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as { message: string})?.message || "Could not delete the split"
        })
    }

})

export default SplitSlice.reducer;
