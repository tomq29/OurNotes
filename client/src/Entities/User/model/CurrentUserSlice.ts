import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../type/UserType';
import AuthApi from '../api/AuthApi';
import { logEmailPassType, loginPassType } from '../type/AuthTypes';
import { AxiosError } from 'axios';

export type userSliceType = {
  user: User | undefined;
  accessToken: string;
  error: string | null;
};

const initialState: userSliceType = {
  user: undefined,
  accessToken: '',
  error: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (loginPass: loginPassType, { rejectWithValue }) => {
    try {
      const response = await AuthApi.login(loginPass);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return rejectWithValue(error.response.data.message);
        } else if (error.request) {
          return rejectWithValue(
            'No response from the server. Please try again later.'
          );
        }
      }

      return rejectWithValue('Network error. Please check your connection.');
    }
  }
);

export const regUser = createAsyncThunk(
  'user/reg',
  async (logEmailPass: logEmailPassType, { rejectWithValue }) => {
    try {
      const response = await AuthApi.reg(logEmailPass);
      return response;
    } catch (error) {
      
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk('user/logout', () =>
  AuthApi.logout()
);

export const refreshUser = createAsyncThunk('user/refresh', () =>
  AuthApi.refreshToken()
);

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(regUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setAccessToken, clearError } = currentUserSlice.actions;
export default currentUserSlice.reducer;
