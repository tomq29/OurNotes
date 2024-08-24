import axiosInstance from '../../../../services/axiosInstace';
import { UserID, UserLogin } from '../../User/type/UserType';
import type { PairType } from '../type/PairsType';

class PairsApi {
  static findUserForPair = async (login: string) => {
    const { data } = await axiosInstance.get<UserLogin[]>(
      `/pairs/users/search?targetLogin=${login}`
    );
    return data;
  };
  static createPair = async (login: string, id: UserID) => {
    const { data } = await axiosInstance.post<{
      message: string;
      pair: PairType;
    }>('/pairs/createRequest', {
      secondUserLogin: login,
      firstUserID: id,
    });
    return data;
  };
  static rejectPair = async (pairID: number) => {
    const { data } = await axiosInstance<{ message: string; status: number }>(
      `/pairs/rejectRequest/${pairID}`
    );
    return data.message;
  };
  static acceptPair = async (pairID: number) => {
    const { data } = await axiosInstance<{ message: string; status: string }>(
      `/pairs/acceptRequest/${pairID}`
    );
    return data;
  };
  static ckeckPair = async (userID: UserID) => {
    const { data } = await axiosInstance<{ message: string; pair: PairType }>(
      `/pairs/checkPair/${userID}`
    );
    return data;
  };
}

export default PairsApi;
