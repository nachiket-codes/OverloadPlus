import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api";

interface User {
    id: string | null,
    token: string | null,
    username: string | null,
    email: string | null
}

interface InitialState {
    user: User,
    loading: boolean | null,
    error: string | null
}


const initialState: InitialState = {
    user : {
        id: null,
        token: null,
        username: null,
        email: null
    },
    loading: false,
    error: null
}

interface LoginData {
    username: string,
    password: string
}

export const loginUser = createAsyncThunk('/login', async (loginData: LoginData) => {
    const resp = await API.post('/auth/login', loginData)
    return resp.data;
})

interface RegisterData {
    username: string,
    email: string,
    password: string
}

export const registerUser = createAsyncThunk('/register', async (registerData: RegisterData) => {
    const resp = await API.post('/user', registerData)
    return resp.data;
})

export const getUser = createAsyncThunk('/getUser', async () => {
    const resp = await API.get('/user')
    return resp.data;
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        logoutUser : (state) => {
            localStorage.removeItem('token');
            state.user.token = null;
            state.user.username = null;
            state.user.email = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            const {id, username, email, token} = action.payload
            state.user.username = username;
            state.user.id = id;
            state.user.token = token;
            state.user.email = email
            localStorage.setItem('token', token)
            window.location.href = "/home";
        }).addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string || "Something went wrong";
        }).addCase(registerUser.pending, (state, action) => {
            state.loading = true
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false
            const {id, username, email, token} = action.payload
            state.user.username = username;
            state.user.id = id;
            state.user.token = token;
            state.user.email = email
            localStorage.setItem('token', token)
            window.location.href = "/home";
        }).addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string || "Something went wrong";
        }).addCase(getUser.pending, (state, action) => {
            state.loading = true
        }).addCase(getUser.fulfilled, (state, action) => {
            state.loading = false
            const {id, username, email, token} = action.payload
            state.user.username = username;
            state.user.id = id;
            state.user.token = token;
            state.user.email = email
            localStorage.setItem('token', token)
        }).addCase(getUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string || "Something went wrong";
        })
    }

})

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;