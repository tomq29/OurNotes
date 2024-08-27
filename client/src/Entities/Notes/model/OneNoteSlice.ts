import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NoteID, NoteWithTexts } from '../type/NoteType';
import NoteApi from '../api/noteApi';

type initialStateType = {
  oneNote: NoteWithTexts;
  loading: boolean;
};

const initialState: initialStateType = {
  oneNote: {
    id: 0,
    description: '',
    title: '',
    folderID: null,
    userID: 0,
    pairID: null,
    createdAt: '',
    Texts: [],
  },

  loading: false,
};

export const getOneNote = createAsyncThunk('note/getOne', (id: NoteID) =>
  NoteApi.getOneNote(id)
);

const oneNote = createSlice({
  name: 'oneNote',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOneNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneNote.fulfilled, (state, action) => {
        state.loading = false;

        state.oneNote = action.payload;
      });
  },
});

export default oneNote.reducer;
