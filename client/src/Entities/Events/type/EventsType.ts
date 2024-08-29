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

export type Toolbar = {
  onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY') => void;
  onView: (view: 'day' | 'month' | 'agenda') => void;
  date: Date; // или другой тип, если требуется
};
