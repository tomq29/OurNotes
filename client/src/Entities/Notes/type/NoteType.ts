import { FolderID } from '../../Folder/type/FolderType';
import { PairID } from '../../Pairs/type/PairsType';
import { Text } from '../../Texts/type/TextType';
import { UserID } from '../../User/type/UserType';

export type Note = {
  id: number;
  title: string;
  description?: string;
  folderID?: FolderID;
  userID: UserID;
  pairID: PairID
};

export type NoteID = Note['id'];

export type NoteWithTexts = Note & {
  Texts: Text[];
};

export type NoteWithoutIDandFolderID = Omit<Note, 'id' | 'folderID'>;