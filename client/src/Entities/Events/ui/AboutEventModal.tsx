import { Container, Modal, Text, Button, Card, Group } from '@mantine/core';
import moment from 'moment';
import { EventType } from '../type/EventsType';
import { useAppDispatch } from '../../../App/providers/store/store';
import { deleteEvent } from '../../User/model/CurrentUserSlice';

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

  return (
    <Modal
      opened={openAboutModal}
      onClose={closeModalHandler}
      title="Информация о событии"
    >
      <Container>
        <Card shadow="sm" padding="lg" style={{ marginBottom: '1rem' }}>
          <Text size="lg" style={{ marginBottom: '0.5rem' }}>
            Название: {currentEvent.title}
          </Text>
          <Text size="sm" style={{ marginBottom: '0.5rem' }}>
            Описание: {currentEvent.description}
          </Text>
          <Group style={{ marginTop: '1rem' }}>
            <Text size="sm">
              Начало: {moment(currentEvent.start).format('DD-MM-YYYY HH:mm')}
            </Text>
            <Text size="sm">
              Окончание: {moment(currentEvent.end).format('DD-MM-YYYY HH:mm')}
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
