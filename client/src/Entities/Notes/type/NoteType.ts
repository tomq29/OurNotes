import { JSONContent } from '@tiptap/react';
import { FolderID } from '../../Folder/type/FolderType';
import { PairID } from '../../Pairs/type/PairsType';
import { Text } from '../../Texts/type/TextType';
import { UserID } from '../../User/type/UserType';

export type Note = {
  id: number;
  title: string;
  description?: string ;
  folderID?: FolderID | null;
  userID: UserID;
  pairID?: PairID | null;
  createdAt: string;
  content?: JSONContent | null;
};

export type NoteID = Note['id'];

export type NoteWithTexts = Note & {
  Texts: Text[];
};

export type NoteWithoutIDFolderIDcreatedAt = Omit<
  Note,
  'id' | 'folderID' | 'createdAt'
>;

export type NoteWithoutCreatedAt = Omit<Note, 'createdAt'>;
