import { RootState, useAppSelector } from '../../App/providers/store/store';
import { Container } from '@mantine/core';
import ModalAddPair from './ui/ModalAddPair';
import './ui/profile.css';
import { useEffect, useState } from 'react';
import PairsApi from '../../Entities/Pairs/api/PairsApi';
import SelectColor from './ui/SelectColor';
import TableForCreator from './ui/TableForCreator';
import ModalConfirmPair from './ui/ModalConfirmPair';
import { UserID } from '../../Entities/User/type/UserType';

function ProfilePage(): JSX.Element {
  const currenStore = useAppSelector(
    (store: RootState) => store.currentUserStore
  );
  const [canMakePair, setCanMakePair] = useState<boolean>(true);
  const [haveNotification, setHaveNotification] = useState<boolean>(false);
  const [firstUserId, setFirstUserId] = useState<UserID>();

  const checkCanMakePair = async () => {
    if (currenStore.user?.colorID) {
      const data = await PairsApi.ckeckPair(currenStore.user?.id);
      console.log(data);

      if (data.pair.userOneID) {
        setCanMakePair(false);
      }
      if (data.pair.userTwoID === currenStore.user?.id) {
        setHaveNotification(true);
        setFirstUserId(data.pair.userOneID);
      }
    }
  };

  useEffect(() => {
    if (currenStore.user) {
      checkCanMakePair();
    }
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
      {haveNotification && <ModalConfirmPair firstUserId={firstUserId}/>}
      
      <SelectColor />
      <TableForCreator currenStore={currenStore} />
    </Container>
  );
}

export default ProfilePage;
