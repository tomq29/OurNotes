import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User, UserID } from '../type/UserType';
import AuthApi from '../api/AuthApi';
import { logEmailPassType, loginPassType } from '../type/AuthTypes';
import { AxiosError } from 'axios';
import PairsApi from '../../Pairs/api/PairsApi';
import type { PairType } from '../../Pairs/type/PairsType';

export type userSliceType = {
  user: User | undefined;
  accessToken: string;
  error: string | null;
  pair: PairType | null;
};

const initialState: userSliceType = {
  user: undefined,
  accessToken: '',
  error: null,
  pair: null,
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

export const createPair = createAsyncThunk(
  'user/createPair',
  ({ login, id }: { login: string; id: UserID }) =>
    PairsApi.createPair(login, id)
);

export const rejectPair = createAsyncThunk('user/deletePair', (id: UserID) =>
  PairsApi.rejectPair(id)
);

export const acceptPair = createAsyncThunk('user/acceptPair', (id: UserID) =>
  PairsApi.acceptPair(id)
);

export const checkPair = createAsyncThunk('user/checkPair', (id: UserID) =>
  PairsApi.ckeckPair(id)
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
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.error = null;
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
        state.error = action.payload;
      })
      .addCase(createPair.fulfilled, (state, action) => {
        state.pair = action.payload;
      })
      .addCase(rejectPair.fulfilled, (state, action) => {
        state.pair = null;
      })
      .addCase(acceptPair.fulfilled, (state, action) => {
        state.pair.status = action.payload.status;
      })
      .addCase(checkPair.fulfilled, (state, action) => {
        state.pair = action.payload;
      });
  },
});

export const { setAccessToken, clearError } = currentUserSlice.actions;
export default currentUserSlice.reducer;
