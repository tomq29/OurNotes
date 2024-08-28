import { useState, useEffect } from 'react';
import {
  Calendar,
  DateLocalizer,
  Formats,
  momentLocalizer,
} from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ru'; // Импортируем русскую локализацию
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../App/providers/store/store';
import AddEventModal from './AddEventModal';
import UpdateEventModal from './UpdateEventModal';
import AboutEventModal from './AboutEventModal';
import { EventType } from '../type/EventsType';
import { Button, Container, Flex } from '@mantine/core';
import { getPairEvents } from '../../User/model/CurrentUserSlice';

moment.locale('ru');
moment.updateLocale('ru', {
  week: {
    dow: 1, // Monday is the first day of the week
  },
});

const localizer = momentLocalizer(moment);

function CalendarComponent() {
  const [currentEvent, setCurrentEvent] = useState<EventType>();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openAboutModal, setOpenAboutModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const currentPair = useAppSelector((store) => store.currentUserStore.pair);
  const events = useAppSelector((store) => store.currentUserStore.events);

  useEffect(() => {
    if (currentPair?.id) {
      dispatch(getPairEvents(currentPair.id));
    }
  }, []);

  const messages = {
    allDay: 'Весь день',
    previous: '<',
    next: '>',
    today: 'Сегодня',
    month: 'Месяц',
    week: 'Неделя',
    day: 'День',
    agenda: 'Повестка дня',
  };

  const formats: Partial<Formats> = {
    timeGutterFormat: 'HH:mm', // Format for the time gutter in 24-hour format
    eventTimeRangeFormat: (
      { start, end }: { start: Date; end: Date },
      culture?: string,
      localizer?: DateLocalizer
    ) =>
      `${localizer?.format(start, 'HH:mm', culture)} - ${localizer?.format(
        end,
        'HH:mm',
        culture
      )}`,
    agendaTimeRangeFormat: (
      { start, end }: { start: Date; end: Date },
      culture?: string,
      localizer?: DateLocalizer
    ) =>
      `${localizer?.format(start, 'HH:mm', culture)} - ${localizer?.format(
        end,
        'HH:mm',
        culture
      )}`,
    dayHeaderFormat: 'dddd, MMMM D', // Format for the day header
    dayRangeHeaderFormat: (
      { start, end }: { start: Date; end: Date },
      culture?: string,
      localizer?: DateLocalizer
    ) =>
      `${localizer?.format(start, 'MMMM D', culture)} - ${localizer?.format(
        end,
        'MMMM D',
        culture
      )}`,
  };

  const handlerOpenAddEventModal = (): void => {
    setOpenAddModal(true); // Открываем модальное окно для добавления события
  };

  const handleSelectEvent = (event: EventType) => {
    setCurrentEvent(event);
    setOpenAboutModal(true);
  };

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        style={{ height: 500 }}
        messages={messages}
        onSelectSlot={handlerOpenAddEventModal} // Обработчик клика по слоту
        onSelectEvent={handleSelectEvent} // Обработчик клика по событию
        selectable // Разрешить выделение слота
        formats={formats}
      />

      {openAddModal && (
        <AddEventModal
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
        />
      )}

      {openAboutModal && currentEvent && (
        <AboutEventModal
          openAboutModal={openAboutModal}
          setOpenAboutModal={setOpenAboutModal}
          setUpdateModal={setOpenUpdateModal}
          currentEvent={currentEvent}
        />
      )}
      {openUpdateModal && currentEvent && (
        <UpdateEventModal
          setOpenUpdateModal={setOpenUpdateModal}
          openUpdateModal={openUpdateModal}
          currentEvent={currentEvent}
        />
      )}
      <Container p="xl">
        <Flex justify="center">
          <Button onClick={handlerOpenAddEventModal}>Добавить событие</Button>
        </Flex>
      </Container>
    </div>
  );
}

export default CalendarComponent;
