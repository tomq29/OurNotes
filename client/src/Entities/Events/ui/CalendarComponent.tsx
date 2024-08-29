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
import { Button, Container, Flex, SegmentedControl } from '@mantine/core';
import {
  getEventTypes,
  getPairEvents,
} from '../../User/model/CurrentUserSlice';
import AddEventOnSection from './AddEventOnSection';
import './css/calendarStyle.css';

moment.locale('ru');
moment.updateLocale('ru', {
  week: {
    dow: 1, // Monday is the first day of the week
  },
});

const localizer = momentLocalizer(moment);

function CalendarComponent(): JSX.Element {
  const [currentEvent, setCurrentEvent] = useState<EventType>();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openAboutModal, setOpenAboutModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [addEventOnSection, setAddEventOnSection] = useState<boolean>(false);
  const [startEvent, setStartEvent] = useState<Date>(new Date());
  const [endEvent, setEndEvent] = useState<Date>(new Date());
  const dispatch = useAppDispatch();
  const currentPair = useAppSelector((store) => store.currentUserStore.pair);
  const events = useAppSelector((store) => store.currentUserStore.events);
  const [filter, setFilter] = useState<string>('Все');

  const eventTypes = useAppSelector(
    (state) => state.currentUserStore.eventTypes
  );

  useEffect(() => {
    if (currentPair?.id) {
      dispatch(getPairEvents(currentPair.id));
      dispatch(getEventTypes());
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
    agenda: 'Таблица событий',
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

  const filteredEvents = events.filter((event) => {
    if (filter === 'Все') {
      return true;
    }
    if (filter === 'Встреча') {
      return event.eventTypeID === 1;
    }
    if (filter === 'Мероприятие') {
      return event.eventTypeID === 2;
    }
    if (filter === 'Дела') {
      return event.eventTypeID === 3;
    }
    if (filter === 'День Рождения') {
      return event.eventTypeID === 4;
    }
    if (filter === 'Спорт') {
      return event.eventTypeID === 5;
    }
    return true;
  });

  // Цвета событий
  const eventPropGetter = (event: EventType) => {
    let backgroundColor = 'gray'; // Установите цвет по умолчанию

    // Пример изменения цвета в зависимости от свойства события
    if (event.eventTypeID === 1) {
      backgroundColor = 'green'; // Цвет для встреч
    } else if (event.eventTypeID === 2) {
      backgroundColor = 'red'; // Цвет для праздников
    } else if (event.eventTypeID === 3) {
      backgroundColor = 'blue'; // Цвет для праздников
    } else if (event.eventTypeID === 4) {
      backgroundColor = 'orange'; // Цвет для праздников
    }

    return {
      style: {
        backgroundColor,
        color: 'white', // Цвет текста
        borderRadius: '5px',
        padding: '1px',
        opacity: '0.7',
      },
    };
  };

  const handlerOpenAddEventModal = (): void => {
    setOpenAddModal(true); // Открываем модальное окно для добавления события
  };

  const handleSelectEvent = (event: EventType) => {
    setCurrentEvent(event);
    setOpenAboutModal(true);
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setStartEvent(start);
    setEndEvent(end);
    setAddEventOnSection(true);
  };

  return (
    <div style={{ height: '500px' }}>
      <SegmentedControl
        value={filter}
        onChange={setFilter}
        radius="xl"
        data={[
          'Все',
          'Встреча',
          'Мероприятие',
          'Дела',
          'День Рождения',
          'Спорт',
        ]}
        styles={{
          root: {
            margin: '20px', // Отступ вокруг компонента
            padding: '10px', // Внутренний отступ
          },
        }}
      />
      <Calendar
        localizer={localizer}
        events={filteredEvents} // Массив событий
        style={{ height: 500 }}
        messages={messages}
        onSelectSlot={handleSelectSlot} // Обработчик клика по слоту
        onSelectEvent={handleSelectEvent} // Обработчик клика по событию
        selectable // Разрешить выделение слота
        formats={formats}
        eventPropGetter={eventPropGetter} // Функция для получения свойств события
      />

      {openAddModal && (
        <AddEventModal
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
          eventTypes={eventTypes}
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
          eventTypes={eventTypes}
        />
      )}

      {addEventOnSection && (
        <AddEventOnSection
          addEventOnSection={addEventOnSection}
          setAddEventOnSection={setAddEventOnSection}
          startEvent={startEvent}
          endEvent={endEvent}
          eventTypes={eventTypes}
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
