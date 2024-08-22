import { Note, NoteWithTexts } from "../../Entities/Notes/type/NoteType";

export type ActionType =
  | { type: 'addNew'; payload: Note }
  | { type: 'delete'; payload: number }
  | { type: 'getAll'; payload: Note[] }
  | { type: 'getOne'; payload: NoteWithTexts }
  | { type: 'update'; payload: Note };