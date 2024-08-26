import { RootState, useAppSelector } from '../../App/providers/store/store';
import { Container } from '@mantine/core';
import ModalAddPair from './ui/ModalAddPair';
import './ui/profile.css';
import { useEffect, useState } from 'react';
import SelectColor from './ui/SelectColor';
import ModalConfirmPair from './ui/ModalConfirmPair';
import TableForFair from './ui/TableForFair';
import Spinner from '../../Shared/LoadingSpinner/Spinner';

function ProfilePage(): JSX.Element {
  const currenStore = useAppSelector(
    (store: RootState) => store.currentUserStore
  );
  const [canMakePair, setCanMakePair] = useState<boolean>(true);
  const [haveNotification, setHaveNotification] = useState<boolean>(false);
  const [isPairTable, setIsPairTable] = useState<boolean>(false);
  const [updatePage, setUpdatePage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const checkCanMakePair = async () => {
    if (currenStore.pair?.id) {
      if (currenStore.user?.id === currenStore.pair?.userOneID) {
        setCanMakePair(false);
        setIsPairTable(true);
        setLoading(false);
      } else if (currenStore.user?.id === currenStore.pair?.userTwoID) {
        if (currenStore.pair?.status === 'pending') {
          setHaveNotification(true);
        }
        setCanMakePair(false);
        setIsPairTable(true);
        setLoading(false);
        console.log('currenStore.pair, ', currenStore.pair, currenStore.user);
      }
    } else {
      setIsPairTable(false);
      setCanMakePair(true);
      setHaveNotification(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkCanMakePair();
  }, [currenStore.pair?.id, updatePage]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Container className="profileContainer">
          <h1 style={{ marginBottom: '20px' }}>Профиль</h1>
          <h2>Информация о вас</h2>
          <p>
            <strong>Ваш логин: </strong> {currenStore?.user?.login}
          </p>
          <p>
            <strong>Ваш email: </strong> {currenStore?.user?.email}
          </p>
          <ModalAddPair canMakePair={canMakePair} />
          {haveNotification && (
            <ModalConfirmPair setUpdatePage={setUpdatePage} />
          )}

          <SelectColor />
          {isPairTable ? (
            <TableForFair />
          ) : (
            <div style={{ marginTop: '20px' }}>У Вас нет пары</div>
          )}
        </Container>
      )}
    </>
  );
}

export default ProfilePage;
