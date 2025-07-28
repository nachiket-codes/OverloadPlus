import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api";
import { AxiosError } from "axios";

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

export const loginUser = createAsyncThunk('/login', async (loginData: LoginData, { rejectWithValue }) => {
    try {
        const resp = await API.post('/auth/login', loginData);
        return resp.data;
      } catch (err) {
        const error = err as AxiosError;
  
        // Handle FastAPI HTTPException detail
        if (error.response && error.response.data) {
          // This assumes FastAPI returns: {"detail": "Some error message"}
          return rejectWithValue((error.response.data as any).detail);
        }
  
        return rejectWithValue('Login failed');
      }
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

interface ForgotPwdData {
    username: string
}

export const sendLoginLink = createAsyncThunk('/sendloginlink', async (userData: ForgotPwdData) => {
    const resp = await API.post('/auth/forgot-pwd', userData)
    return resp.data;
})

interface ResetPwdData {
    password: string,
    token: string
}

export const resetPassword = createAsyncThunk('/resetpassword', async (resetPwdData: ResetPwdData) => {
    const resp = await API.post('/auth/reset-pwd', resetPwdData)
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
            window.location.href = "/";
        }).addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = (action.payload as { message: string })?.message || "Something went wrong";
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
            window.location.href = "/";
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
        }).addCase(sendLoginLink.fulfilled, (state) => {
            state.loading = false;
        }).addCase(sendLoginLink.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string || "Something went wrong";
        }).addCase(sendLoginLink.pending, (state, action) => {
            state.loading = true
        }).addCase(resetPassword.fulfilled, (state) => {
            state.loading = false;
            window.location.href = "/login"
        }).addCase(resetPassword.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string || "Something went wrong";
        }).addCase(resetPassword.pending, (state) => {
            state.loading = true
        })
    }

})

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;