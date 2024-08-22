import store from '../src/App/providers/store/store';
import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { User } from '../src/Entities/User/type/UserType';
import axios from 'axios';
import { setAccessToken } from '../src/Entities/User/model/CurrentUserSlice';

type RetryConfig = {
  sent?: boolean;
} & InternalAxiosRequestConfig;

type TokensRefreshResponse = {
  accessToken: string;
  user: User; // СДелать типизацию !!!!!!
};

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = store.getState().currentUserStore.accessToken;
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const prevRequest: RetryConfig | undefined = error?.config;
    if (!prevRequest) {
      return Promise.reject(error);
    }
    if (error?.response?.status === 403 && !prevRequest.sent) {
      const response = await axios<TokensRefreshResponse>(
        '/api/tokens/refresh'
      );
      const newAccessToken = response.data.accessToken;
      setAccessToken(newAccessToken);
      prevRequest.sent = true;
      prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
