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
import { EventType, Toolbar } from '../type/EventsType';
import {
  Button,
  Container,
  Flex,
  Group,
  SegmentedControl,
} from '@mantine/core';
import {
  getEventTypes,
  getPairEvents,
} from '../../User/model/CurrentUserSlice';
import AddEventOnSection from './AddEventOnSection';
import './css/calendarStyle.css';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

moment.locale('ru'); // Устанавливаем локализацию на русский
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

  // 24 формат отображения
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

  // Фильтрация событий
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
    let backgroundColor = 'gray'; //  цвет по умолчанию

    // Выбираем цвет согласно типу события
    if (event.eventTypeID === 1) {
      backgroundColor = 'green'; // Цвет для встреч
    } else if (event.eventTypeID === 2) {
      backgroundColor = 'red'; // Цвет для мероприятий
    } else if (event.eventTypeID === 3) {
      backgroundColor = 'blue'; // Цвет для дел
    } else if (event.eventTypeID === 4) {
      backgroundColor = 'orange'; // Цвет для дня рождения
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

  // Новый тулбар

  const CustomToolbar = (toolbar: Toolbar): JSX.Element => {
    const goToBack = () => {
      toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };

    const goToToday = () => {
      toolbar.onNavigate('TODAY');
    };

    const handleViewChange = (view: 'day' | 'month' | 'agenda'): void => {
      toolbar.onView(view);
    };

    // Формат даты
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    // Обрабатываем вид отображения даты
    const dateString = toolbar.date.toLocaleDateString('ru', options);
    // const formattedDateString =
    //   dateString.charAt(0).toUpperCase() + dateString.slice(1);

    return (
      <Container
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: '0.5rem',
        }}
      >
        <Group
          gap="lg"
          style={{
            display: 'flex',
            gap: '0.4rem',
          }}
        >
          <Button variant="default" radius="xl" onClick={goToBack} size="xs">
            <IconArrowLeft stroke={2} size={18} />
          </Button>
          <Button variant="default" radius="xl" onClick={goToToday} size="xs">
            Сегодня
          </Button>
          <Button variant="default" radius="xl" onClick={goToNext} size="xs">
            <IconArrowRight stroke={2} size={18} />
          </Button>
        </Group>

        <Container>{dateString}</Container>
        <Group
          style={{
            display: 'flex',
            // justifyContent: 'space-around',
            gap: '0.4rem',
          }}
        >
          <Button
            variant="default"
            radius="xl"
            size="xs"
            onClick={() => handleViewChange('day')}
          >
            День
          </Button>
          <Button
            variant="default"
            radius="xl"
            size="xs"
            onClick={() => handleViewChange('month')}
          >
            Месяц
          </Button>
          <Button
            variant="default"
            radius="xl"
            size="xs"
            onClick={() => handleViewChange('agenda')}
          >
            События
          </Button>
        </Group>
      </Container>
    );
  };

  return (
    <Container style={{ width: '100%' }}>
      <Flex style={{ height: '85vh', width: '100%' }}>
        <Flex
          direction="column"
          w={'100%'}
          style={{
            maxWidth: '150px', // Ширина фильтра
          }}
        >
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
                maxWidth: '150px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '10px',
                marginTop: '60px',
                gap: '10px',
                backgroundColor: '#F1F3F5',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' /* Тень */,
              },
              control: {
                width: '100%',
                border: 'none',
                before: {
                  display: 'none',
                },
              },
            }}
          />
        </Flex>

        <Flex
          style={{
            width: '100%',
            margin: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Calendar
            localizer={localizer}
            events={filteredEvents} // Массив событий
            style={{ height: '100%', width: '100%' }} // Занимает всю оставшуюся высоту
            messages={messages}
            onSelectSlot={handleSelectSlot} // Обработчик клика по слоту
            onSelectEvent={handleSelectEvent} // Обработчик клика по событию
            selectable // Разрешить выделение слота
            formats={formats}
            eventPropGetter={eventPropGetter} // Функция для получения свойств события
            components={{
              toolbar: CustomToolbar, // Используем кастомный тулбар
            }}
          />

          <Container p="xl">
            <Flex justify="center">
              <Button onClick={handlerOpenAddEventModal} variant="outline">
                Добавить событие
              </Button>
            </Flex>
          </Container>
        </Flex>

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
      </Flex>
    </Container>
  );
}

export default CalendarComponent;
