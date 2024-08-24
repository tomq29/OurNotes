import { Button, Modal } from '@mantine/core';
import { useEffect, useState } from 'react';
import PairsApi from '../../../Entities/Pairs/api/PairsApi';
import type { UserLogin } from '../../../Entities/User/type/UserType';
import { useAppSelector } from '../../../App/providers/store/store';
import './profile.css';
import InputAreaPair from './InputAreaPair';

function ModalAddPair({ canMakePair }: { canMakePair: boolean }): JSX.Element {
  const [loginForSearch, setLoginForSearch] = useState('');
  const [findedLogins, setFindedLogins] = useState<string[]>([]);
  const [opened, setOpened] = useState(false); // State to control modal visibility
  const [userForPair, setUserForPair] = useState<string>('');
  const user = useAppSelector((store) => store.currentUserStore.user);

  const getFindedLogins = async (loginForSearch: UserLogin) => {
    setFindedLogins([]);
    const data = await PairsApi.findUserForPair(loginForSearch);
    setFindedLogins(data);
  };

  const createPairRequest = () => {
    if (user) {
      PairsApi.createPair(userForPair, user.id)
        .then((data) => console.log(data))
        .then(() => setOpened(false));
    }
  };

  const closeModalHandler = () => {
    setLoginForSearch('');
    setFindedLogins([]);
    setOpened(false);
    setUserForPair('');
  };

  useEffect(() => {
    if (loginForSearch.length > 0) {
      getFindedLogins(loginForSearch.toLowerCase());
    }
  }, [loginForSearch]);

  return (
    <>
      <Button disabled={!canMakePair} onClick={() => setOpened(true)}>
        Добавить пару
      </Button>

      <Modal
        opened={opened}
        onClose={closeModalHandler}
        title="Введите логин пользователя для создания пары"
      >
        {userForPair ? (
          <div>
            <strong>{userForPair}</strong>
          </div>
        ) : (
          <InputAreaPair
            setLoginForSearch={setLoginForSearch}
            findedLogins={findedLogins}
            setUserForPair={setUserForPair}
          />
        )}

        <Button
          fullWidth
          onClick={createPairRequest}
          mt="md"
          disabled={userForPair === ''}
        >
          Добавить
        </Button>
      </Modal>
    </>
  );
}

export default ModalAddPair;
