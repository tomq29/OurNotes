import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Note, NoteID, NoteWithoutCreatedAt } from '../type/NoteType';
import NoteApi from '../api/noteApi';

type initialStateType = {
  oneNote: Note;
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
    content: null,
  },

  loading: false,
};

export const getOneNote = createAsyncThunk('note/getOne', (id: NoteID) =>
  NoteApi.getOneNote(id)
);

export const editNoteContent = createAsyncThunk(
  'note/editContent',
  (note: NoteWithoutCreatedAt) => NoteApi.updateNote(note)
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
        state.oneNote = action.payload;
        state.loading = false;
      })
      .addCase(editNoteContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(editNoteContent.fulfilled, (state, action) => {
        state.oneNote = action.payload.updatedNote;
        state.loading = false;
      });
  },
});

export default oneNote.reducer;
