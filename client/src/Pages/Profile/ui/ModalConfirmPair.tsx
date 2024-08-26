import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useEffect, useState } from 'react';
import UsersApi from '../../../Entities/User/api/UsersApi';
import { User, UserID } from '../../../Entities/User/type/UserType';
import PairsApi from '../../../Entities/Pairs/api/PairsApi';
import { PairType } from '../../../Entities/Pairs/type/PairsType';

type Props = {
  firstUserId: UserID;
  currentPair: PairType;
};
function ModalConfirmPair({ firstUserId, currentPair }: Props) {
  const [firstUser, setFirstUser] = useState<User>({} as User);

  const getFirstUser = (id: UserID) => {
    UsersApi.getUser(id)
      .then((data) => {
        setFirstUser(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rejectPairHandler = (): void => {
    PairsApi.rejectPair(currentPair.id);
    console.log('Rejected');
  };

  const acceptPairHandler = (): void => {
    PairsApi.acceptPair(currentPair.id);
    console.log('Approved');
  };

  useEffect(() => {
    getFirstUser(firstUserId);
  },[firstUserId]);
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
          общее рабочее простарнство с пользователем{' '}
          <strong>{firstUser.login}</strong>
        </Text>
      ),
      labels: { confirm: 'Создать пару', cancel: 'Отменить' },
      onCancel: () => rejectPairHandler(),
      onConfirm: () => acceptPairHandler(),
    });

  return <Button onClick={openModal}>Входящие заявки</Button>;
}

export default ModalConfirmPair;
