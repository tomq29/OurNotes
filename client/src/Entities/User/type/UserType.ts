import { ColorID } from '../../Colors/type/ColorType';

export type User = {
  id: number;
  login: string;
  email: string;
  colorID?: ColorID;
};

export type UserID = User['id'];
export type UserLogin = User['login'];
