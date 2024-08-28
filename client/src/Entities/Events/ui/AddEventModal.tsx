import { Container, Modal, TextInput, Button, Card } from '@mantine/core';
import React from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../App/providers/store/store';
import { useForm } from '@mantine/form';
import { createEvent } from '../../User/model/CurrentUserSlice';
import { DateTimePicker } from '@mantine/dates';

type Props = {
  openAddModal: boolean;
  setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddEventModal({ openAddModal, setOpenAddModal }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const currentStore = useAppSelector((store) => store.currentUserStore);

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      start: new Date(),
      end: new Date(),
      pairID: currentStore.pair?.id,
      eventTypeID: 1,
      allDay: false,
    },
    validate: {
      title: (value) => (value.length > 0 ? null : 'Введите название события'),
    },
  });

  const closeModalHandler = () => {
    setOpenAddModal(false);
  };

  const submitHandler = () => {
    if (currentStore.pair) {
      const data = form.getValues();
      data.pairID = currentStore.pair.id;
      if (data.pairID) {
        dispatch(createEvent(data));
        closeModalHandler(); // Закрываем модальное окно после отправки
      }
    }
  };

  return (
    <Modal
      opened={openAddModal}
      onClose={closeModalHandler}
      title="Введите название события"
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
              required
              {...form.getInputProps('description')}
              style={{ marginBottom: '1rem' }}
            />
            <DateTimePicker
              label="Выберите время начала события"
              placeholder="Выберите дату и время начала"
              valueFormat="YYYY MMM DD HH:mm"
              {...form.getInputProps('start')}
              style={{ marginBottom: '1rem' }}
              required
            />
            <DateTimePicker
              label="Выберите время окончания события"
              placeholder="Выберите дату и время окончания"
              valueFormat="YYYY MMM DD HH:mm"
              {...form.getInputProps('end')}
              style={{ marginBottom: '1rem' }}
              required
            />
            <Button type="submit" fullWidth>
              Создать событие
            </Button>
          </form>
        </Card>
      </Container>
    </Modal>
  );
}

export default AddEventModal;
