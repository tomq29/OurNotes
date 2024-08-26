import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Note, NoteID, NoteWithoutIDandFolderID } from '../type/NoteType';
import NoteApi from '../api/noteApi';
import { UserID } from '../../User/type/UserType';

type initialStateType = { notes: Note[]; loading: boolean };

const initialState: initialStateType = { notes: [], loading: false };

export const getAllNotes = createAsyncThunk('notes/getAll', () =>
  NoteApi.getAllNotes()
);
export const getUsersNotes = createAsyncThunk(
  'notes/getAllUsers',
  (userID: UserID) => NoteApi.getUsersNotes(userID)
);
export const createlNote = createAsyncThunk(
  'notes/createNote',
  (note: NoteWithoutIDandFolderID) => NoteApi.createNote(note)
);
export const deleteNote = createAsyncThunk('notes/deleteNote', (id: NoteID) =>
  NoteApi.deteleNote(id)
);
export const updateNote = createAsyncThunk('notes/updateNote', (note: Note) =>
  NoteApi.updateNote(note)
);

const notesSlice = createSlice({
  name: 'Notes',
  initialState,
  reducers: {
    clearNotes: (state) => {
      state.loading = false;
      state.notes = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotes.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllNotes.fulfilled, (state, action) => {
      state.notes.push(...action.payload);
      state.loading = false;
    });
    builder.addCase(getUsersNotes.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsersNotes.fulfilled, (state, action) => {
      state.notes.push(...action.payload);
      state.loading = false;
    });

    builder.addCase(createlNote.fulfilled, (state, action) => {
      state.notes.push(action.payload);
      state.loading = false;
    });

    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.notes = state.notes.filter((el) => el.id !== action.payload.id);
      state.loading = false;
    });

    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.notes = state.notes.map((el) =>
        el.id === action.payload.id ? action.meta.arg : el
      );
      state.loading = false;
    });
  },
});

export const { clearNotes } = notesSlice.actions;

export default notesSlice.reducer;
