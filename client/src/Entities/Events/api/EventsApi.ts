import axiosInstance from '../../../../services/axiosInstace';
import type { PairID } from '../../Pairs/type/PairsType';
import type { EventID, EventNewType, EventType } from '../type/EventsType';

class EventsApi {
  static async getEvents(pairID: PairID) {
    try {
      const { data } = await axiosInstance.get<{
        message: string;
        events: EventType[];
      }>(`/events/pairs/${pairID}`);
      return data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  static async getOneEvent(eventID: EventID) {
    try {
      const { data } = await axiosInstance.get<{
        message: string;
        event: EventType;
      }>(`/events/${eventID}`);
      return data;
    } catch (error) {
      console.error('Error fetching event:', error);
      throw error;
    }
  }

  static async createEvent(event: EventNewType) {
    try {
      const { data } = await axiosInstance.post<{
        message: string;
        event: EventType;
      }>(`/events`, event);
      return data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  static async deleteEvent(eventID: EventID) {
    try {
      const { data } = await axiosInstance.delete<{
        message: string;
        eventID: EventID;
      }>(`/events/${eventID}`);
      return data;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }

  static async updateEvent(eventID: EventID, event: EventType) {
    try {
      const { data } = await axiosInstance.put<{
        message: string;
        event: EventType;
      }>(`/events/${eventID}`, event);
      return data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }
}

export default EventsApi;
