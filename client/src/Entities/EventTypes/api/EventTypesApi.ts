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
  static async getEventType(id: number) {
    const { data } = await axiosInstance.get<{
      message: string;
      eventType: EventTypeType;
    }>(`/eventtypes/${id}`);
    return data;
  }
}

export default EventTypesApi;
