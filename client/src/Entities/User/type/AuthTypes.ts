import { PairType } from '../../Pairs/type/PairsType';
import { User } from './UserType';

export type logEmailPassType = {
  login: string;
  email: string;
  password: string;
  confirm: string;
};

export type loginPassType = {
  email: string;
  password: string;
};

export type LogRegResponceType = {
  user: User;
  accessToken: string;
};

export type LoginResponseType = LogRegResponceType & {
  userPair?: PairType;
};
