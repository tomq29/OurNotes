import { RootState, useAppSelector } from '../../App/providers/store/store';

import { Container } from '@mantine/core';

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
        console.log(
          'currentStore.pair, ',
          currentStore.pair,
          currentStore.user
        );
      }
    } else {
      setIsPairTable(false);
      setCanMakePair(true);
      setHaveNotification(false);
    }
    setLoading(false); // Set loading to false once all conditions are checked
  };

  console.log(currentStore?.user?.login);

  useEffect(() => {
    checkCanMakePair();
  }, [currentStore.pair?.id, currentStore.user?.id, updatePage]); // Adding user ID to dependencies
    return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Container className="profileContainer">
          <h1 className="profile-title">Профиль</h1> {/* Using CSS class */}
          <h2>Информация о вас</h2>
          <p>
            <strong>Ваш логин: </strong> {currentStore?.user?.login}
          </p>
          <p>
            <strong>Ваш email: </strong> {currentStore?.user?.email}
          </p>
          <ModalAddPair canMakePair={canMakePair} />
          {haveNotification && (
            <ModalConfirmPair setUpdatePage={setUpdatePage} />
          )}
          <SelectColor />
          {isPairTable ? (
            <TableForPair />
          ) : (
            <div style={{ marginTop: '20px' }}>У Вас нет пары</div>
          )}
        </Container>
      )}
    </>
  );
}

export default ProfilePage;
