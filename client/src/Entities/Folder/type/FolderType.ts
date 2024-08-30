import { UserID } from '../../User/type/UserType';

export type Folder = {
  id: number ;
  name: string;
  purpose: string;
  userID: UserID;
};

export type FolderID = Folder['id'];
