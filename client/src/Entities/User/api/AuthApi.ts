import axiosInstance from '../../../../services/axiosInstace';

import {
  logEmailPassType,
  loginPassType,
  LoginResponseType,
  LogRegResponceType,
} from '../type/AuthTypes';

class AuthApi {
  static login = async (loginPass: loginPassType) => {
    const { data } = await axiosInstance.post<LoginResponseType>(
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
    const { data } = await axiosInstance.get<LoginResponseType>(
      '/tokens/refresh'
    );
    return data;
  };
}

export default AuthApi;
