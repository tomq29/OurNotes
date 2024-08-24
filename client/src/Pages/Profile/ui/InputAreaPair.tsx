import { TextInput } from '@mantine/core';
import FindedItem from './FindedItem';

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
  return (
    <>
      <TextInput
        label="Введите email"
        placeholder="Логин пользователя"
        data-autofocus
        onChange={(event) => setLoginForSearch(event.target.value)}
      />
      <div className="findedDesc">найденные пользователи:</div>
      {findedLogins.length === 0 && <div>Ничего не найдено</div>}

      {findedLogins.length > 0 &&
        findedLogins.map((login) => (
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
