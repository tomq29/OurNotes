import { PairID } from '../../Pairs/type/PairsType';

export type EventType = {
  id: number;
  title: string;
  description: string;
  start: Date;
  end: Date;
  allDay: boolean;
  pairID: PairID | undefined;
  eventTypeID: EventID;
};

export type EventNewType = Omit<EventType, 'id'>;

export type EventID = EventType['id'];
