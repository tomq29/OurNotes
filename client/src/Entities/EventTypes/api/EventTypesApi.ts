import axiosInstance from '../../../../services/axiosInstace';
import { EventTypeType } from '../type/EventTypesType';

class EventTypesApi {
  static async getEventTypes() {
    const { data } = await axiosInstance.get<{
      message: string;
      eventTypes: EventTypeType[];
    }>('/eventtypes');
    return data;
  }
}

export default EventTypesApi;
