import { RootState, useAppSelector } from '../../App/providers/store/store';

import { Card, Container, Flex, Title } from '@mantine/core';

import ModalAddPair from './ui/ModalAddPair';
import './ui/profile.css';
import { useEffect, useState } from 'react';
import SelectColor from './ui/SelectColor';
import ModalConfirmPair from './ui/ModalConfirmPair';
import TableForPair from './ui/TableForPair';
import Spinner from '../../Shared/LoadingSpinner/Spinner';

function ProfilePage(): JSX.Element {
  const currentStore = useAppSelector(
    (store: RootState) => store.currentUserStore
  );
  const [canMakePair, setCanMakePair] = useState<boolean>(true);
  const [haveNotification, setHaveNotification] = useState<boolean>(false);
  const [isPairTable, setIsPairTable] = useState<boolean>(false);
  const [updatePage, setUpdatePage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const checkCanMakePair = () => {
    if (currentStore.pair?.id) {
      if (currentStore.user?.id === currentStore.pair.userOneID) {
        setCanMakePair(false);
        setIsPairTable(true);
      } else if (currentStore.user?.id === currentStore.pair.userTwoID) {
        if (currentStore.pair.status === 'pending') {
          setHaveNotification(true);
        }
        setCanMakePair(false);
        setIsPairTable(true);
      }
    } else {
      setIsPairTable(false);
      setCanMakePair(true);
      setHaveNotification(false);
    }
    setLoading(false); // Set loading to false once all conditions are checked
  };

  useEffect(() => {
    checkCanMakePair();
  }, [currentStore.pair?.id, currentStore.user?.id, updatePage]); // Adding user ID to dependencies
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Container className="profileContainer">
          <Title
            style={{ textAlign: 'center', fontSize: '40px', marginTop: '20px' }}
            className="profile-title"
          >
            Личный кабинет
          </Title>{' '}
          {/* Using CSS class */}
          <Card mt={20} withBorder shadow="sm" padding="lg" radius="md">
            <h2 style={{ margin: '0' }}>Информация о вас :</h2>
            <p style={{ margin: '2% 0', fontSize: '20px' }}>
              <strong>Ваш логин: </strong> {currentStore?.user?.login}
            </p>
            <p style={{ margin: '0 0 1% 0', fontSize: '20px' }}>
              <strong>Ваш email: </strong> {currentStore?.user?.email}
            </p>
            <Flex mt={20} gap={'md'} direction={'column'}>
              <ModalAddPair canMakePair={canMakePair} />
              {haveNotification && (
                <ModalConfirmPair setUpdatePage={setUpdatePage} />
              )}
            </Flex>

            <SelectColor />
            {isPairTable ? (
              <TableForPair />
            ) : (
              <div style={{ marginTop: '20px' }}>У Вас нет пары</div>
            )}
          </Card>
        </Container>
      )}
    </>
  );
}

export default ProfilePage;
