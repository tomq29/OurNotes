import {
  Container,
  Modal,
  TextInput,
  Button,
  Card,
  NativeSelect,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../App/providers/store/store';
import { useForm } from '@mantine/form';
import { clearError, createEvent } from '../../User/model/CurrentUserSlice';
import { DateTimePicker } from '@mantine/dates';
import { EventTypeType } from '../../EventTypes/type/EventTypesType';
import { IconCheck, IconX } from '@tabler/icons-react';

type Props = {
  openAddModal: boolean;
  setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  eventTypes: EventTypeType[];
};

function AddEventModal({
  openAddModal,
  setOpenAddModal,
  eventTypes,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const currentStore = useAppSelector((store) => store.currentUserStore);
  const error = useAppSelector((state) => state.currentUserStore.error);
  const [selectTypeValue, setSelectTypeValue] = useState<number>(1);

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      start: new Date(),
      end: (() => {
        const date = new Date();
        date.setHours(date.getHours() + 1); // Добавляем 1 час
        return date;
      })(),
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
      data.eventTypeID = selectTypeValue;
      if (data.pairID) {
        const id = notifications.show({
          loading: true,
          title: 'Создание события',
          message: 'Загрузка данных',
          autoClose: false,
          withCloseButton: false,
        });

        dispatch(createEvent(data))
          .then((action) => {
            if (action.meta.requestStatus === 'fulfilled') {
              notifications.update({
                id,
                color: 'teal',
                title: 'Успешно',
                message: 'Запись успешно создана',
                icon: (
                  <IconCheck style={{ width: 'rem(18)', height: 'rem(18)' }} />
                ),
                loading: false,
                autoClose: 3000,
              });
            }

            if (action.meta.requestStatus === 'rejected') {
              notifications.update({
                id,
                color: 'red',
                title: 'Ошибка',
                message: error,
                icon: <IconX style={{ width: 'rem(18)', height: 'rem(18)' }} />,
                loading: false,
                autoClose: 3000,
              });
            }
          })
          .catch(console.log);
      }
    }
    clearError();
    closeModalHandler();
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
              radius="xl"
            />
            <TextInput
              label="Описание события"
              required
              {...form.getInputProps('description')}
              style={{ marginBottom: '1rem' }}
              radius="xl"
            />
            <NativeSelect
              value={selectTypeValue}
              radius="xl"
              onChange={(event) =>
                setSelectTypeValue(Number(event.currentTarget.value))
              }
              data={eventTypes.map((eventType) => ({
                value: String(eventType.id),
                label: eventType.title,
              }))}
            />
            <DateTimePicker
              label="Выберите время начала события"
              placeholder="Выберите дату и время начала"
              valueFormat="DD MMM YYYY HH:mm"
              {...form.getInputProps('start')}
              style={{ marginBottom: '1rem' }}
              required
              radius="xl"
            />
            <DateTimePicker
              label="Выберите время окончания события"
              placeholder="Выберите дату и время окончания"
              valueFormat="DD MMM YYYY HH:mm"
              {...form.getInputProps('end')}
              style={{ marginBottom: '1rem' }}
              required
              radius="xl"
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
