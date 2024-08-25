import axiosInstance from '../../../../services/axiosInstace';
import { ColorID } from '../../Colors/type/ColorType';
import type { UserID, User } from '../type/UserType';

class UsersApi {
  static changeColor = async (userID: UserID, colorID: ColorID) => {
    const { data } = await axiosInstance.put<{ message: string; user: User }>(
      `/users/${userID}`,
      {colorID: colorID}
    );
    return data;
  };
}

export default UsersApi;
