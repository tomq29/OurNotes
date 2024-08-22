import axiosInstance from '../../../../services/axiosInstace';

import {
  logEmailPassType,
  loginPassType,
  LogRegResponceType,
} from '../type/AuthTypes';

class AuthApi {
  static login = async (loginPass: loginPassType) => {
    const { data } = await axiosInstance.post<LogRegResponceType>(
      '/auth/login',
      loginPass
    );
    return data;
  };

  static reg = async (logEmailPass: logEmailPassType) => {
    const { data } = await axiosInstance.post<LogRegResponceType>(
      '/auth/reg',
      logEmailPass
    );
    return data;
  };

  static logout = async () => {
    const { data } = await axiosInstance.delete<LogRegResponceType>(
      '/auth/logout'
    );

    return data;
  };

  static refreshToken = async () => {
    const { data } = await axiosInstance.get<LogRegResponceType>(
      '/tokens/refresh'
    );
    return data;
  };
}

export default AuthApi;
