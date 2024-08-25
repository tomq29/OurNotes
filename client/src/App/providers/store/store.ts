import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import notesSlice from '../../../Entities/Notes/model/NotesSlice';
import OneNote from '../../../Entities/Notes/model/OneNoteSlice';
import CurrentUserSlice from '../../../Entities/User/model/CurrentUserSlice';

const store = configureStore({
  reducer: {
    notesStore: notesSlice,
    oneNoteStore: OneNote,
    currentUserStore: CurrentUserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
