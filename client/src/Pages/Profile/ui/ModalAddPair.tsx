import { Button, Modal, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import PairsApi from '../../../Entities/Pairs/api/PairsApi';
import type { UserLogin } from '../../../Entities/User/type/UserType';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../App/providers/store/store';
import './profile.css';
import InputAreaPair from './InputAreaPair';
import { createPair } from '../../../Entities/User/model/CurrentUserSlice';

function ModalAddPair({ canMakePair }: { canMakePair: boolean }): JSX.Element {
  const [loginForSearch, setLoginForSearch] = useState<string>('');
  const [foundLogins, setFoundLogins] = useState<string[]>([]);
  const [opened, setOpened] = useState<boolean>(false); // State to control modal visibility
  const [userForPair, setUserForPair] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // State for loading feedback
  const [error, setError] = useState<string | null>(null); // State for handling errors

  const user = useAppSelector((store) => store.currentUserStore.user);
  const dispatch = useAppDispatch();

  const fetchFoundLogins = async (loginForSearch: UserLogin) => {
    setFoundLogins([]);
    setLoading(true);
    setError(null);

    try {
      const data = await PairsApi.findUserForPair(loginForSearch);
      setFoundLogins(data);
    } catch (err) {
      setError('Failed to find users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createPairRequest = () => {
    if (user && userForPair) {
      dispatch(createPair({ secondUserLogin: userForPair, firstUserID: user.id }))
        .then(() => setOpened(false))
        .catch(() => setError('Failed to create pair. Please try again.'));
    }
  };

  const closeModalHandler = () => {
    setLoginForSearch('');
    setFoundLogins([]);
    setUserForPair('');
    setOpened(false);
    setError(null); // Reset error when modal closes
  };

  useEffect(() => {
    if (loginForSearch.length > 2) {
      const debounceSearch = setTimeout(() => {
        fetchFoundLogins(loginForSearch.toLowerCase());
      }, 300); // Debounce API call by 300ms

      return () => clearTimeout(debounceSearch); // Cleanup debounce on unmount or input change
    }
  }, [loginForSearch]);

  return (
    <>
      <Button w={170} variant='filled' color='blue' disabled={!canMakePair} onClick={() => setOpened(true)}>
        Добавить пару
      </Button>

      <Modal
        opened={opened}
        onClose={closeModalHandler}
        title="Введите логин пользователя для создания пары"
      >
        {error && <div className="error-message">{error}</div>} {/* Error Message Display */}
        
        {userForPair ? (
          <div>
            <strong>{userForPair}</strong>
          </div>
        ) : (
          <>
            <InputAreaPair
              setLoginForSearch={setLoginForSearch}
              foundLogins={foundLogins}
              setUserForPair={setUserForPair}
            />
            {loading && <Loader size="sm" />} {/* Loader during search */}
          </>
        )}

        <Button
          onClick={createPairRequest}
          mt="md"
          disabled={!userForPair} // Simplified check
          w={170}
          variant='filled' color='green'
        >
          Добавить
        </Button>
      </Modal>
    </>
  );
}

export default ModalAddPair;
