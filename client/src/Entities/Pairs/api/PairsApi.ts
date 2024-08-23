import axiosInstance from '../../../../services/axiosInstace';
import { UserID, UserLogin } from '../../User/type/UserType';
import type { PairType } from '../type/PairsType';

class PairsApi {
  static findUserForPair = async (login: string) => {
    const { data } = await axiosInstance.get<UserLogin[]>(
      `/pairs/users/search?targetLogin=${login}`,
     
    );
    return data;
  };
  static createPair = async (secondUserLogin: string, firstUserID: UserID) => {
    const { data } = await axiosInstance.post<{
      message: string;
      pair: PairType;
    }>('/pairs/createRequest', {
      secondUserLogin,
      firstUserID,
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
  static ckeckPair = async (id: UserID) => {
    const { data } = await axiosInstance<{ message: string; pair: PairType }>(
      `/pairs/checkPair/${id}`
    );
    return data;
  };
}

export default PairsApi;
