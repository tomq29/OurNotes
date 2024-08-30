import { AxiosResponse } from 'axios';
import {
  Note,
  NoteID,
  NoteWithoutCreatedAt,
  NoteWithoutIDFolderIDcreatedAt,
} from '../type/NoteType';

import axiosInstance from '../../../../services/axiosInstace';
import { UserID } from '../../User/type/UserType';

type updateNote = {
  updateStatus: number;
  id: number;
  updatedNote: Note;
};

type deteleNote = {
  countDeletedNotes: number;
  id: number;
};

class NoteApi {
  static getAllNotes = async (): Promise<Note[]> => {
    const { data }: AxiosResponse<Note[]> = await axiosInstance.get('/notes/');
    return data;
  };

  static getUsersNotes = async (userID: UserID): Promise<Note[]> => {
    const { data }: AxiosResponse<Note[]> = await axiosInstance.get(
      `/notes/${userID}`
    );
    return data;
  };

  static getOneNote = async (id: NoteID): Promise<Note> => {
    const { data }: AxiosResponse<Note> = await axiosInstance.get(
      `/notes/note/${id}`
    );

    return data;
  };

  static createNote = async (
    note: NoteWithoutIDFolderIDcreatedAt
  ): Promise<Note> => {
    const { data } = await axiosInstance.post<Note>('/notes', note);
    return data;
  };

  static updateNote = async (
    note: NoteWithoutCreatedAt
  ): Promise<updateNote> => {
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
