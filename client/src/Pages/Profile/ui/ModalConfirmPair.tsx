import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useEffect, useState } from 'react';
import UsersApi from '../../../Entities/User/api/UsersApi';
import { User, UserID } from '../../../Entities/User/type/UserType';
import PairsApi from '../../../Entities/Pairs/api/PairsApi';
import { RootState, useAppSelector } from '../../../App/providers/store/store';
import { useNavigate } from 'react-router-dom';

function ModalConfirmPair({
  setUpdatePage,
}: {
  setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [firstUser, setFirstUser] = useState<User>({} as User);
  const currenStore = useAppSelector(
    (store: RootState) => store.currentUserStore
  );

  const navigate = useNavigate();

  const getFirstUser = (id: UserID) => {
    UsersApi.getUser(id)
      .then((data) => {
        setFirstUser(data.user);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  };

  const rejectPairHandler = (): void => {
    if (currenStore.pair?.id) {
      PairsApi.rejectPair(currenStore.pair.id)
        .then(() => console.log('Rejected'))
        .then(() => setUpdatePage((prev) => !prev))
        .catch((error) => console.error('Error rejecting pair:', error));
    }
    navigate('/profile');
  };

  const acceptPairHandler = (): void => {
    if (currenStore.pair?.id) {
      PairsApi.acceptPair(currenStore.pair.id)
        .then(() => console.log('Approved'))
        .then(() => setUpdatePage((prev) => !prev))
        .catch((error) => console.error('Error accepting pair:', error));
    }
    navigate('/profile');
  };

  useEffect(() => {
    if (currenStore.pair?.userOneID) {
      getFirstUser(currenStore.pair.userOneID);
    }
  }, [currenStore.pair]); // Added dependency array

  const openModal = () =>
    modals.openConfirmModal({
      title: 'Пожалуйста, выберите действие',
      size: 'sm',
      radius: 'md',
      withCloseButton: false,
      children: (
        <Text size="sm" style={{ textAlign: 'center' }}>
          У Вас есть входящий запрос на создание пары от пользователя{' '}
          <strong>{firstUser.login}</strong>! Подтвердите, что вы хотите создать
          общее рабочее пространство с пользователем{' '}
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
