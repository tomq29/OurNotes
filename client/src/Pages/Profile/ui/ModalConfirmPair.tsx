import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useEffect, useState } from 'react';
import UsersApi from '../../../Entities/User/api/UsersApi';
import { User } from '../../../Entities/User/type/UserType';

function ModalConfirmPair({ firstUserId }: { firstUserId: UserID }) {
  const [firstUser, setFirstUser] = useState<User>({} as User);

  const getFirstUser = (id) => {
    UsersApi.getUser(id)
      .then((data) => {
        setFirstUser(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (firstUserId) {
      getFirstUser(firstUserId);
    }
  });
  const openModal = () =>
    modals.openConfirmModal({
      title: 'Пожалуйста, выберите действие',
      size: 'sm',
      radius: 'md',
      withCloseButton: false,
      children: (
        <Text size="sm" style={{ textAlign: 'center' }}>
          У Вас есть входящий запрос на создание пары от пользователя{' '}
          <strong>{firstUser.login}</strong>! Подтвердите, что вы ходите создать
          общее рабочее простарнство с пользователем <strong>{firstUser.login}</strong>
        </Text>
      ),
      labels: { confirm: 'Создать пару', cancel: 'Отменить' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed'),
    });

  return <Button onClick={openModal}>Входящие заявки</Button>;
}

export default ModalConfirmPair;
