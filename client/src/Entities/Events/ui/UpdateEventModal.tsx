import {
  Container,
  Modal,
  TextInput,
  Button,
  Card,
  Group,
  NativeSelect,
} from '@mantine/core';
import React, { useState } from 'react';
import { DateTimePicker } from '@mantine/dates';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../App/providers/store/store';
import { useForm } from '@mantine/form';
import { updateEvent } from '../../User/model/CurrentUserSlice';
import { EventTypeType } from '../../EventTypes/type/EventTypesType';
import { EventType } from '../type/EventsType';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { clearError } from '../../User/model/CurrentUserSlice';

type Props = {
  openUpdateModal: boolean;
  setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentEvent: EventType;
  eventTypes: EventTypeType[];
};

function UpdateEventModal({
  openUpdateModal,
  setOpenUpdateModal,
  currentEvent,
  eventTypes,
}: Props): JSX.Element {
  const [selectTypeValue, setSelectTypeValue] = useState<number>(
    currentEvent.eventTypeID
  );
  const dispatch = useAppDispatch();
  const currentStore = useAppSelector((store) => store.currentUserStore);
  const error = useAppSelector((state) => state.currentUserStore.error);

  const form = useForm({
    initialValues: {
      id: currentEvent.id,
      title: currentEvent.title,
      description: currentEvent.description,
      start: new Date(currentEvent.start),
      end: new Date(currentEvent.end),
      pairID: currentStore.pair?.id,
      eventTypeID: currentEvent.eventTypeID,
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
      data.eventTypeID = selectTypeValue;

      data.start = new Date(data.start);
      data.end = new Date(data.end);
      const id = notifications.show({
        loading: true,
        title: 'Создание события',
        message: 'Загрузка данных',
        autoClose: false,
        withCloseButton: false,
      });

      dispatch(updateEvent({ eventID: data.id, event: data }))
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
      clearError();
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
              radius="xl"
            />
            <TextInput
              label="Описание события"
              {...form.getInputProps('description')}
              required
              style={{ marginBottom: '1rem' }}
              radius="xl"
            />
            <NativeSelect
              radius="xl"
              onChange={(event) =>
                setSelectTypeValue(Number(event.currentTarget.value))
              }
              data={eventTypes.map((eventType) => ({
                value: String(eventType.id),
                label: eventType.title,
              }))}
            />
            <Group style={{ marginBottom: '1rem' }}>
              <DateTimePicker
                label="Выберите время начала события"
                placeholder="Выберите дату и время начала"
                valueFormat="YYYY MMM DD HH:mm"
                {...form.getInputProps('start')}
                radius="xl"
              />
              <DateTimePicker
                label="Выберите время окончания события"
                placeholder="Выберите дату и время окончания"
                valueFormat="YYYY MMM DD HH:mm"
                {...form.getInputProps('end')}
                radius="xl"
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
