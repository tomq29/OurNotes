import { RootState, useAppSelector } from '../../App/providers/store/store';
import { Container } from '@mantine/core';
import ModalAddPair from './ui/ModalAddPair';
import './ui/profile.css';
import { useEffect, useState } from 'react';
import PairsApi from '../../Entities/Pairs/api/PairsApi';
import SelectColor from './ui/SelectColor';
import TableForCreator from './ui/TableForCreator';
import ModalConfirmPair from './ui/ModalConfirmPair';
import type { UserID } from '../../Entities/User/type/UserType';
import type { PairType } from '../../Entities/Pairs/type/PairsType';

function ProfilePage(): JSX.Element {
  const currenStore = useAppSelector(
    (store: RootState) => store.currentUserStore
  );
  const [canMakePair, setCanMakePair] = useState<boolean>(true);
  const [haveNotification, setHaveNotification] = useState<boolean>(false);
  const [creatorPairTable, setCreatorPairTable] = useState<boolean>(false);
  const [firstUserId, setFirstUserId] = useState<UserID>();
  const [currentPair, setCurrentPair] = useState<PairType>();

  const checkCanMakePair = async () => {
    if (currenStore.user?.id) {
      const data = await PairsApi.checkPair(currenStore.user?.id);
      console.log(data);

      if (data.pair.userOneID) {
        setCanMakePair(false);
        setCurrentPair(data.pair);
        setCreatorPairTable(true);
      }
      if (
        data.pair.userTwoID === currenStore.user?.id &&
        data.pair.status === 'pending'
      ) {
        setHaveNotification(true);
        setFirstUserId(data.pair.userOneID);
      }
    }
  };

  useEffect(() => {
    checkCanMakePair();
  }, []);

  return (
    <Container className="profileContainer">
      <h2>Профиль</h2>
      <p>
        <strong>Ваш логин: </strong> {currenStore?.user?.login}
      </p>
      <p>
        <strong>Ваш email: </strong> {currenStore?.user?.email}
      </p>
      <ModalAddPair canMakePair={canMakePair} />
      {haveNotification && (
        <ModalConfirmPair firstUserId={firstUserId} currentPair={currentPair} />
      )}

      <SelectColor />
      {creatorPairTable ? (
        <TableForCreator currenStore={currenStore} />
      ) : (
        <div style={{ marginTop: '20px' }}>У Вас нет пары</div>
      )}
    </Container>
  );
}

export default ProfilePage;
