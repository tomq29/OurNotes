import { Container, Modal, Text, Button, Card, Group } from '@mantine/core';
import moment from 'moment';
import { EventType } from '../type/EventsType';
import { useAppDispatch } from '../../../App/providers/store/store';
import { deleteEvent } from '../../User/model/CurrentUserSlice';
import { useEffect, useState } from 'react';
import EventTypesApi from '../../EventTypes/api/EventTypesApi';
import { EventTypeType } from '../../EventTypes/type/EventTypesType';

type Props = {
  openAboutModal: boolean;
  setOpenAboutModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentEvent: EventType;
};

function AboutEventModal({
  openAboutModal,
  setOpenAboutModal,
  setUpdateModal,
  currentEvent,
}: Props): JSX.Element {
  const [currentEventType, setCurrentEventType] = useState<EventTypeType>();
  const closeModalHandler = () => {
    setOpenAboutModal(false);
  };
  const dispatch = useAppDispatch();

  const openUpdateModalHandler = () => {
    setOpenAboutModal(false);
    setUpdateModal(true);
  };

  const deleteButtonHandler = () => {
    dispatch(deleteEvent(currentEvent.id));
    closeModalHandler();
  };

  useEffect(() => {
    if (currentEvent.eventTypeID) {
      EventTypesApi.getEventType(currentEvent.eventTypeID)
        .then((res) => {
          if (res.eventType.id) {
            setCurrentEventType(res.eventType);
          }
        })
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentEvent.eventTypeID]);

  return (
    <Modal
      opened={openAboutModal}
      onClose={closeModalHandler}
      title="Информация о событии"
    >
      <Container>
        <Card shadow="sm" padding="lg" style={{ marginBottom: '1rem' }}>
          <Group>
            <Text size="lg" fw={300} style={{ marginBottom: '0.5rem' }}>
              Название:
            </Text>
            <Text size="lg" fw={500} style={{ marginBottom: '0.5rem' }}>
              {currentEvent.title}
            </Text>
          </Group>
          <Group>
            <Text size="lg" fw={300} style={{ marginBottom: '0.5rem' }}>
              Описание:
            </Text>
            <Text size="lg" fw={500} style={{ marginBottom: '0.5rem' }}>
              {currentEvent.description}
            </Text>
          </Group>
          <Group>
            <Text size="lg" fw={300} style={{ marginBottom: '0.5rem' }}>
              Тип события:
            </Text>
            <Text size="lg" fw={500} style={{ marginBottom: '0.5rem' }}>
              {currentEventType?.title || 'Неизвестно'}
            </Text>
          </Group>
          <Group>
            <Text size="lg" fw={300} style={{ marginBottom: '0.5rem' }}>
              Начало:
            </Text>
            <Text size="lg" fw={500} style={{ marginBottom: '0.5rem' }}>
              {moment(currentEvent.start).format('DD-MM-YYYY HH:mm')}
            </Text>
          </Group>
          <Group>
            <Text size="lg" fw={300} style={{ marginBottom: '0.5rem' }}>
              Окончание:
            </Text>
            <Text size="lg" fw={500} style={{ marginBottom: '0.5rem' }}>
              {moment(currentEvent.end).format('DD-MM-YYYY HH:mm')}
            </Text>
          </Group>
          <Button
            variant="outline"
            style={{ marginTop: '1rem' }}
            onClick={openUpdateModalHandler}
          >
            Изменить событие
          </Button>
          <Button
            onClick={deleteButtonHandler}
            type="button"
            className="btn btn-outline-secondary"
            variant="outline"
            color="red"
            style={{ marginTop: '1rem' }}
          >
            Удалить событие
          </Button>
        </Card>
      </Container>
    </Modal>
  );
}

export default AboutEventModal;
