import { Text, TextInput } from '@mantine/core';
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
        mt={10}
        placeholder="Логин пользователя"
        data-autofocus
        onChange={(event) => setLoginForSearch(event.target.value)}
      />
     

      {foundLogins.length === 0 ? (
        <Text mt={10} ta="center">Ничего не найдено</Text>

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
