import { UserID } from '../../User/type/UserType';

export type Folder = {
  id: number | null;
  name: string;
  purpose: string;
  userID: UserID;
};

export type FolderID = Folder['id'];
