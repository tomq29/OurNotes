import { useAppSelector } from '../../App/providers/store/store';
import { Button, Container } from '@mantine/core';
import ModalAddPair from './ui/ModalAddPair';
import './ui/profile.css';
import { useEffect, useState } from 'react';
import PairsApi from '../../Entities/Pairs/api/PairsApi';
import SelectColor from './ui/SelectColor';

function ProfilePage(): JSX.Element {
  const currentUser = useAppSelector((store) => store.currentUserStore.user);
  const [canMakePair, setCanMakePair] = useState<boolean>(true);

  const checkCanMakePair = async () => {
    if (currentUser) {
      const data = await PairsApi.ckeckPair(currentUser.id);
      if (data.pair.id) {
        setCanMakePair(false);
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      checkCanMakePair();
    }
  }, []);

  return (
    <Container className="profileContainer">
      <h2>Профиль</h2>
      <p>
        <strong>Ваш логин: </strong> {currentUser?.login}
      </p>
      <p>
        <strong>Ваш email: </strong> {currentUser?.email}
      </p>
      <ModalAddPair canMakePair={canMakePair} />
      <div className="profileRequestButton">
        <Button>Входящие заявки</Button>
      </div>
      <SelectColor />
    </Container>
  );
}

export default ProfilePage;
