import { TextInput } from '@mantine/core';

import { useAppSelector } from '../../../App/providers/store/store';
import FoundItem from './FoundItem';


type Props = {
  setLoginForSearch: (value: string) => void;
  foundLogins: string[]; // Renamed for consistency
  setUserForPair: (value: string) => void;
};

function InputAreaPair({
  setLoginForSearch,
  foundLogins,
  setUserForPair,
}: Props): JSX.Element {
  const currentUser = useAppSelector((store) => store.currentUserStore.user);

  const filteredLogins = foundLogins.filter((login) => login !== currentUser?.login);

  return (
    <>
      <TextInput
        radius="xl"
        label="Введите email"
        placeholder="Логин пользователя"
        data-autofocus
        onChange={(event) => setLoginForSearch(event.target.value)}
      />
      <div className="found-desc">найденные пользователи:</div>

      {foundLogins.length === 0 ? (
        <div>Ничего не найдено</div>
      ) : (
        filteredLogins.map((login) => (
          <FoundItem
            key={login}
            login={login}
            setUserForPair={setUserForPair}
          />
        ))
      )}
    </>
  );
}

export default InputAreaPair;
