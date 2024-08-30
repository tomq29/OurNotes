import { UserID } from '../../User/type/UserType';

export type PairType = {
  id: number;
  userOneID: UserID;
  userTwoID: UserID;
  status: string;
};


export type PairID = PairType['id'];
