import axiosInstance from '../../../../services/axiosInstace';
import { ColorID } from '../../Colors/type/ColorType';
import type { UserID, User } from '../type/UserType';

class UsersApi {
  static changeColor = async (userID: UserID, colorID: ColorID) => {
    const { data } = await axiosInstance.put<{ message: string; user: User }>(
      `/users/${userID}`,
      { colorID: colorID }
    );
    return data;
  };
  static getUser = async (id: UserID) => {
    const { data } = await axiosInstance.get<{ message: string; user: User }>(
      `/users/${id}`
    );
    return data;
  };
}

export default UsersApi;
