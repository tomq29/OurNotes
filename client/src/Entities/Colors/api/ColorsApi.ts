import axiosInstance from '../../../../services/axiosInstace';
import { Color } from '../type/ColorType';

class ColorsApi {
  static getColors = async () => {
    const { data } = await axiosInstance.get<Color[]>('/colors');
    return data;
  };
}

export default ColorsApi;
