import {
  Container,
  Modal,
  TextInput,
  Button,
  Card,
  Group,
} from '@mantine/core';
import React from 'react';
import { DateTimePicker } from '@mantine/dates';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../App/providers/store/store';
import { useForm } from '@mantine/form';
import { updateEvent } from '../../User/model/CurrentUserSlice';
import { EventType } from '../type/EventsType';

type Props = {
  openUpdateModal: boolean;
  setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentEvent: EventType;
};

function UpdateEventModal({
  openUpdateModal,
  setOpenUpdateModal,
  currentEvent,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const currentStore = useAppSelector((store) => store.currentUserStore);

  const form = useForm({
    initialValues: {
      id: currentEvent.id,
      title: currentEvent.title,
      description: currentEvent.description,
      start: new Date(currentEvent.start),
      end: new Date(currentEvent.end),
      pairID: currentStore.pair?.id,
      eventTypeID: 1,
      allDay: false,
    },
  });

  const closeModalHandler = () => {
    setOpenUpdateModal(false);
  };

  const submitHandler = () => {
    if (currentStore.pair) {
      const data = form.getValues();
      data.pairID = currentStore.pair.id;
      data.start = new Date(data.start);
      data.end = new Date(data.end);
      dispatch(updateEvent({ eventID: data.id, event: data }));
      setOpenUpdateModal(false); // Закрываем модал после успешного обновления
    }
  };

  return (
    <Modal
      opened={openUpdateModal}
      onClose={closeModalHandler}
      title="Введите изменения для события"
    >
      <Container>
        <Card shadow="sm" padding="lg">
          <form onSubmit={form.onSubmit(submitHandler)}>
            <TextInput
              label="Название события"
              {...form.getInputProps('title')}
              required
              style={{ marginBottom: '1rem' }}
            />
            <TextInput
              label="Описание события"
              {...form.getInputProps('description')}
              required
              style={{ marginBottom: '1rem' }}
            />
            <Group style={{ marginBottom: '1rem' }}>
              <DateTimePicker
                label="Выберите время начала события"
                placeholder="Выберите дату и время начала"
                valueFormat="YYYY MMM DD HH:mm"
                {...form.getInputProps('start')}
              />
              <DateTimePicker
                label="Выберите время окончания события"
                placeholder="Выберите дату и время окончания"
                valueFormat="YYYY MMM DD HH:mm"
                {...form.getInputProps('end')}
              />
            </Group>
            <Button type="submit" fullWidth variant="outline">
              Сохранить изменения
            </Button>
          </form>
        </Card>
      </Container>
    </Modal>
  );
}

export default UpdateEventModal;
