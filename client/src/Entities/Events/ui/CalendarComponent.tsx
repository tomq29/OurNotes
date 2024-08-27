import  { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ru'; // Импортируем русскую локализацию
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch } from 'react-redux';
// import { addEvent, updateEvent } from './eventSlice'; // Импортируйте ваши actions

moment.locale('ru'); // Устанавливаем локализацию на русский
const localizer = momentLocalizer(moment);

function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const myEventsList = [
      {
        start: new Date(2024, 7, 26, 10, 0),
        end: new Date(2024, 7, 26, 12, 0),
        title: 'Свадьба',
      },
      {
        start: new Date(2024, 7, 26, 12, 0),
        end: new Date(2024, 7, 26, 15, 0),
        title: 'Свадьба',
      },
      {
        start: new Date(2024, 7, 27, 14, 0),
        end: new Date(2024, 7, 27, 16, 0),
        title: 'Мероприятие 2',
      },
    ];
    setEvents(myEventsList);
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
    // Названия дней недели
    sunday: 'Воскресенье',
    monday: 'Понедельник',
    tuesday: 'Вторник',
    wednesday: 'Среда',
    thursday: 'Четверг',
    friday: 'Пятница',
    saturday: 'Суббота',
    // Названия месяцев
    january: 'Январь',
    february: 'Февраль',
    march: 'Март',
    april: 'Апрель',
    may: 'Май',
    june: 'Июнь',
    july: 'Июль',
    august: 'Август',
    september: 'Сентябрь',
    october: 'Октябрь',
    november: 'Ноябрь',
    december: 'Декабрь',
  };

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('Введите название события');
    if (title) {
      const newEvent = { start, end, title };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      dispatch(addEvent(newEvent)); // Отправляем событие в Redux
    }
  };

  const handleSelectEvent = (event) => {
    setCurrentEvent(event);
    setModalOpen(true);
  };

  const handleUpdateEvent = () => {
    const title = window.prompt(
      'Введите новое название события',
      currentEvent.title
    );
    if (title) {
      const updatedEvent = { ...currentEvent, title };
      setEvents((prevEvents) =>
        prevEvents.map((evt) => (evt === currentEvent ? updatedEvent : evt))
      );
      dispatch(updateEvent(updatedEvent)); // Отправляем обновленное событие в Redux
      setModalOpen(false);
    }
  };

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={messages}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent} // Обработчик клика по событию
        selectable
      />
      {modalOpen && (
        <div className="modal">
          <h2>Редактировать событие</h2>
          <p>Текущая тема: {currentEvent.title}</p>
          <button onClick={handleUpdateEvent}>Изменить название события</button>
          <button onClick={() => setModalOpen(false)}>Закрыть</button>
        </div>
      )}
    </div>
  );
}

export default CalendarComponent;
