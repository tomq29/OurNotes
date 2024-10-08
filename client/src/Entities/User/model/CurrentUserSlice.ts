import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User, UserID } from '../type/UserType';
import AuthApi from '../api/AuthApi';
import type { logEmailPassType, loginPassType } from '../type/AuthTypes';
import { AxiosError } from 'axios';
import PairsApi from '../../Pairs/api/PairsApi';
import type { PairID, PairType } from '../../Pairs/type/PairsType';
import { ColorID } from '../../Colors/type/ColorType';
import UsersApi from '../api/UsersApi';
import type {
  EventID,
  EventNewType,
  EventType,
} from '../../Events/type/EventsType';
import EventsApi from '../../Events/api/EventsApi';
import { EventTypeType } from '../../EventTypes/type/EventTypesType';
import EventTypesApi from '../../EventTypes/api/EventTypesApi';

export type userSliceType = {
  user: User | undefined;
  accessToken: string;
  error: string | null;
  pair: PairType | null;
  loading: boolean;
  events: EventType[];
  eventTypes: EventTypeType[];
};

const initialState: userSliceType = {
  user: undefined,
  accessToken: '',
  error: null,
  pair: null,
  loading: false,
  events: [],
  eventTypes: [],
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
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data.message);
      }

      return rejectWithValue('An unexpected error occurred.');
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
  ({
    secondUserLogin,
    firstUserID,
  }: {
    secondUserLogin: string;
    firstUserID: UserID;
  }) => PairsApi.createPair(secondUserLogin, firstUserID)
);

export const rejectPair = createAsyncThunk(
  'user/deletePair',
  (pairID: number) => PairsApi.rejectPair(pairID)
);

export const acceptPair = createAsyncThunk('user/acceptPair', (id: UserID) =>
  PairsApi.acceptPair(id)
);

export const checkPair = createAsyncThunk('user/checkPair', (id: UserID) =>
  PairsApi.checkPair(id)
);

export const updateUserColor = createAsyncThunk(
  'user/updateColor',
  ({ id, colorID }: { id: UserID; colorID: ColorID }) =>
    UsersApi.changeColor(id, colorID)
);

export const getPairEvents = createAsyncThunk(
  'user/getEvents',
  (pairID: PairID) => EventsApi.getEvents(pairID)
);

export const getOneEvent = createAsyncThunk(
  'user/getOneEvent',
  (eventID: EventID) => EventsApi.getOneEvent(eventID)
);

export const createEvent = createAsyncThunk(
  'user/createEvent',
  async (event: EventNewType, { rejectWithValue }) => {
    try {
      const response = await EventsApi.createEvent(event);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return rejectWithValue(error.response.data.message);
        } else if (error.request) {
          return rejectWithValue(
            'Нет ответа от сервера. Попробуйте еще раз позже.'
          );
        }
      }

      return rejectWithValue('Неизвестная ошибка. Попробуйте еще раз.');
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'user/deleteEvent',
  (eventID: EventID) => EventsApi.deleteEvent(eventID)
);

export const updateEvent = createAsyncThunk(
  'user/updateEvent',
  ({ eventID, event }: { eventID: EventID; event: EventType }) =>
    EventsApi.updateEvent(eventID, event)
);

export const getEventTypes = createAsyncThunk('user/getEventTypes', () =>
  EventTypesApi.getEventTypes()
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
      // Handle refreshUser loading state
      .addCase(refreshUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        if (action.payload.userPair) {
          state.pair = action.payload.userPair;
        }
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Other cases remain the same as before
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;

        if (action.payload.userPair) {
          state.pair = action.payload.userPair;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.pair = null;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(regUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(createPair.fulfilled, (state, action) => {
        state.pair = action.payload.pair;
      })
      .addCase(rejectPair.fulfilled, (state) => {
        state.pair = null;
      })
      .addCase(acceptPair.fulfilled, (state, action) => {
        if (state.pair) {
          state.pair.status = action.payload.status;
        }
      })
      .addCase(checkPair.fulfilled, (state, action) => {
        state.pair = action.payload.pair;
      })
      .addCase(updateUserColor.fulfilled, (state, action) => {
        if (state.user) {
          state.user.colorID = action.payload.user.colorID;
        }
      })
      .addCase(getPairEvents.fulfilled, (state, action) => {
        if (state.pair?.id) {
          const newPayloadEvents = action.payload.events.map((event) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          }));
          state.events = [...newPayloadEvents];
        }
      })
      .addCase(createEvent.rejected, (state, action) => {
        console.log(action.payload);

        state.error = action.payload as string;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        if (state.pair?.id) {
          const newPayloadEvent = {
            ...action.payload.event,
            start: new Date(action.payload.event.start),
            end: new Date(action.payload.event.end),
          };
          state.events = [...state.events, newPayloadEvent];
        }
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event.id !== Number(action.payload.eventID)
        );
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const newPayloadEvent = {
          ...action.payload.event,
          start: new Date(action.payload.event.start),
          end: new Date(action.payload.event.end),
        };
        state.events = state.events.map((event) => {
          if (event.id === newPayloadEvent.id) {
            return newPayloadEvent;
          }
          return event;
        });
      })
      .addCase(getEventTypes.fulfilled, (state, action) => {
        state.eventTypes = action.payload.eventTypes;
      });
  },
});

export const { setAccessToken, clearError } = currentUserSlice.actions;
export default currentUserSlice.reducer;
