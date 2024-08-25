import { TextInput } from '@mantine/core';
import FindedItem from './FindedItem';
import { useAppSelector } from '../../../App/providers/store/store';

type Props = {
  setLoginForSearch: (value: string) => void;
  findedLogins: string[];
  setUserForPair: (value: string) => void;
};

function InputAreaPair({
  setLoginForSearch,
  findedLogins,
  setUserForPair,
}: Props): JSX.Element {
  const currentUser = useAppSelector((store) => store.currentUserStore.user);
  return (
    <>
      <TextInput
        radius="xl"
        label="Введите email"
        placeholder="Логин пользователя"
        data-autofocus
        onChange={(event) => setLoginForSearch(event.target.value)}
      />
      <div className="findedDesc">найденные пользователи:</div>
      {findedLogins.length === 0 && <div>Ничего не найдено</div>}

      {findedLogins.length > 0 &&
        findedLogins
          .filter((log) => log !== currentUser?.login)
          .map((login) => (
            <FindedItem
              key={login}
              login={login}
              setUserForPair={setUserForPair}
            />
          ))}
    </>
  );
}

export default InputAreaPair;
