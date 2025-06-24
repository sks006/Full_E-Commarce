/** @format */

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;
axios.defaults.withCredentials = true;

// Define user type
interface User {
     id: number;
     name: string;
     email: string;
}

// Auth state
interface AuthState {
     user: User | null;
     accessToken: string | null;
     status: "idle" | "loading" | "succeeded" | "failed";
     error: string | null;
}

const initialState: AuthState = {
     user: null,
     accessToken: null,
     status: "idle",
     error: null,
};

// Register User
export const registerUser = createAsyncThunk<
     User,
     { name: string; email: string; password: string }
>("auth/registerUser", async (payload, { rejectWithValue }) => {
    


     try {
          
          const res = await axios.post(`${API_URL}/register`, payload);
          console.log("API Success:", res.data);
          return res.data.User; // backend returns newUser inside User
     } catch (error) {
          if (axios.isAxiosError(error)) {
               return rejectWithValue(
                    error.response?.data?.message || error.message,
               );
          }
          return rejectWithValue("An unknown error occurred");
     }
});

// Login User
export const loginUser = createAsyncThunk<
     { user: User; accessToken: string },
     { email: string; password: string }
>("auth/loginUser", async (payload, { rejectWithValue }) => {
     try {
          const res = await axios.post(`${API_URL}/login`, payload);
          console.log("API Success:", res.data);
          return res.data.data; 
          
          // { user, accessToken }
     } catch (error) {
          if (axios.isAxiosError(error)) {
               return rejectWithValue(
                    error.response?.data?.message || error.message,
               );
          }
          return rejectWithValue("Login failed");
     }
});

// Logout
export const logoutUser = createAsyncThunk(
     "auth/logoutUser",
     async (_, { rejectWithValue }) => {
          try {
               await axios.post(`${API_URL}/logout`);
               return true;
          } catch (error) {
               return rejectWithValue("Logout failed" + error);
          }
     },
);
const authSlice = createSlice({
     name: "auth",
     initialState,
     reducers: {
          setUser: (state, action: PayloadAction<User>) => {
               state.user = action.payload;
             },
          setAccessToken: (state, action: PayloadAction<string>) => {
               state.accessToken = action.payload;
          },
          clearAuthState: (state) => {
               state.user = null;
               state.accessToken = null;
               state.error = null;
               state.status = "idle";
          },
     },
     extraReducers: (builder) => {
          // REGISTER
          builder
               .addCase(registerUser.pending, (state) => {
                    state.status = "loading";
               })
               .addCase(registerUser.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.user = action.payload;
               })
               .addCase(registerUser.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload as string;
               });

          // LOGIN
          builder
               .addCase(loginUser.pending, (state) => {
                    state.status = "loading";
               })
               .addCase(loginUser.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.user = action.payload.user;
                    state.accessToken = action.payload.accessToken;
               })
               .addCase(loginUser.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload as string;
               });

          // LOGOUT
          builder.addCase(logoutUser.fulfilled, (state) => {
               state.user = null;
               state.accessToken = null;
               state.status = "idle";
          });
     },
});
export const { setAccessToken, clearAuthState,setUser } = authSlice.actions;
export default authSlice.reducer;
