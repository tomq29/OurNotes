import { Note, NoteWithTexts } from '../../Entities/Notes/type/NoteType';
import { ActionType } from './actionType';

export type InitStateType = {
  notes: Note[];
  oneNote: NoteWithTexts;
};

export const initStateForReducer: InitStateType = {
  notes: [],
  oneNote: {
    id: 0,
    description: '',
    title: '',
    folderID: null,
    userID: 0,
    Texts: [],
  },
};

export function reducer(
  state: InitStateType,
  action: ActionType
): InitStateType {
  switch (action.type) {
    case 'addNew':
      return { ...state, notes: [...state.notes, action.payload] };

    case 'delete':
      return {
        ...state,
        notes: state.notes.filter((el) => el.id !== action.payload),
      };

    case 'getAll':
      return { ...state, notes: action.payload };

    case 'getOne':
      return { ...state, oneNote: action.payload };

    case 'update':
      return {
        ...state,
        notes: state.notes.map((el) => {
          if (el.id === action.payload.id) {
            return { ...el, ...action.payload };
          } else {
            return el;
          }
        }),
      };

    default:
      return state;
  }
}
