import axiosInstance from '../../../../services/axiosInstace';
import { Text, TextWithoutID } from '../type/TextType';

class TextApi {
  //   static getAllText = async (): Promise<Note[]> => {
  //     const { data }: AxiosResponse<Note[]> = await axiosInstance.get('/notes');
  //     return data;
  //   };

  //   static getOneNote = async (id: NoteID): Promise<NoteWithTexts> => {
  //     const { data }: AxiosResponse<NoteWithTexts> = await axiosInstance.get(
  //       `/notes/note/${id}`
  //     );
  //     return data;
  //   };

  static createText = async (text: TextWithoutID): Promise<Text> => {
    const { data } = await axiosInstance.post<Text>('/text', text);
    return data;
  };

  static updateText = async (note: Text): Promise<number> => {
    const { data } = await axiosInstance.put<{
      updateStatus: number;
    }>(`/text/${note.id}`, note);

    return data.updateStatus;
  };

  static deteleText = async (id: number): Promise<number> => {
    const { data } = await axiosInstance.delete<{
      countDeletedNotes: number;
    }>(`/text/${id}`);
    return data.countDeletedNotes;
  };
}

export default TextApi;
