import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useEffect, useState } from 'react';
import UsersApi from '../../../Entities/User/api/UsersApi';
import { User, UserID } from '../../../Entities/User/type/UserType';
import PairsApi from '../../../Entities/Pairs/api/PairsApi';
import { RootState, useAppDispatch, useAppSelector } from '../../../App/providers/store/store';
import { useNavigate } from 'react-router-dom';
import { acceptPair, rejectPair } from '../../../Entities/User/model/CurrentUserSlice';

function ModalConfirmPair({
  setUpdatePage,
}: {
  setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [firstUser, setFirstUser] = useState<User | null>(null); // Initialize with null
  const [loading, setLoading] = useState<boolean>(false); // Loading state for API calls
  const currentStore = useAppSelector((store: RootState) => store.currentUserStore); // Fixed typo
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getFirstUser = async (id: UserID) => {
    setLoading(true);
    try {
      const data = await UsersApi.getUser(id);
      setFirstUser(data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
      // Display error to the user, e.g., using a notification
    } finally {
      setLoading(false);
    }
  };

  const rejectPairHandler = async () => {
    if (currentStore.pair?.id) {
      setLoading(true);
      try {
        await dispatch(rejectPair(currentStore.pair.id));
        setUpdatePage((prev) => !prev);
        navigate('/profile');
      } catch (error) {
        console.error('Error rejecting pair:', error);
        // Display error to the user
      } finally {
        setLoading(false);
      }
    }
  };

  const acceptPairHandler = async () => {
    if (currentStore.pair?.id) {
      setLoading(true);
      try {
        await dispatch(acceptPair(currentStore.pair.id));
        setUpdatePage((prev) => !prev);
        navigate('/profile');
      } catch (error) {
        console.error('Error accepting pair:', error);
        // Display error to the user
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (currentStore.pair?.userOneID) {
      getFirstUser(currentStore.pair.userOneID);
    }
  }, [currentStore.pair?.userOneID]); // Only re-run if userOneID changes

  const openModal = () => {
    modals.openConfirmModal({
      title: 'Пожалуйста, выберите действие',
      size: 'sm',
      radius: 'md',
      withCloseButton: false,
      children: (
        <Text size="sm" className="confirm-pair-text">
          У Вас есть входящий запрос на создание пары от пользователя{' '}
          <strong>{firstUser?.login || 'загрузка...'}</strong>! Подтвердите, что
          вы хотите создать общее рабочее пространство с пользователем{' '}
          <strong>{firstUser?.login || 'загрузка...'}</strong>
        </Text>
      ),
      labels: { confirm: 'Создать пару', cancel: 'Отменить' },
      onCancel: rejectPairHandler, // Simplified function reference
      onConfirm: acceptPairHandler, // Simplified function reference
    });
  };

  return (
    <Button onClick={openModal} disabled={loading}>
      {loading ? 'Загрузка...' : 'Входящие заявки'}
    </Button>
  );
}

export default ModalConfirmPair;
