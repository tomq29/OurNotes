import { AxiosResponse } from 'axios';
import {
  Note,
  NoteID,
  NoteWithoutIDandFolderID,
  NoteWithTexts,
} from '../type/NoteType';

import axiosInstance from '../../../../services/axiosInstace';

type updateNote = {
  updateStatus: number;
  id: number;
};

type deteleNote = {
  countDeletedNotes: number;
  id: number;
};

class NoteApi {
  static getAllNotes = async (): Promise<Note[]> => {
    const { data }: AxiosResponse<Note[]> = await axiosInstance.get('/notes');
    return data;
  };

  static getOneNote = async (id: NoteID): Promise<NoteWithTexts> => {
    const { data }: AxiosResponse<NoteWithTexts> = await axiosInstance.get(
      `/notes/note/${id}`
    );

    return data;
  };

  static createNote = async (note: NoteWithoutIDandFolderID): Promise<Note> => {
    const { data } = await axiosInstance.post<Note>('/notes', note);
    return data;
  };

  static updateNote = async (note: Note): Promise<updateNote> => {
    const { data } = await axiosInstance.put<updateNote>(
      `/notes/note/${note.id}`,
      note
    );

    return data;
  };

  static deteleNote = async (id: number): Promise<deteleNote> => {
    const { data } = await axiosInstance.delete<deteleNote>(
      `/notes/note/${id}`
    );

    return data;
  };
}

export default NoteApi;
