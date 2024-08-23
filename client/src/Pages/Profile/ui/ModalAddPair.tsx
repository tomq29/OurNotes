import { TextInput, Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useEffect, useState } from 'react';
import PairsApi from '../../../Entities/Pairs/api/PairsApi';

function ModalAddPair(): JSX.Element {
  const [findingLogin, setFindingLogin] = useState('');
  const [findedLogins, setFindedLogins] = useState<string[]>([]);

  useEffect(() => {
    PairsApi.findUserForPair(findingLogin)
      .then((data) => console.log(data))
      .catch(console.log);
  }, [findingLogin]);

  return (
    <Button
      onClick={() => {
        modals.open({
          title: 'Введите логин пользователя для создания пары',
          children: (
            <>
              <TextInput
                label="Логин пользователя"
                placeholder="Логин пользователя"
                data-autofocus
                onChange={(e) => setFindingLogin(e.target.value)}
              />
              <Button fullWidth onClick={() => modals.closeAll()} mt="md">
                Добавить
              </Button>
            </>
          ),
        });
      }}
    >
      Добавить пару
    </Button>
  );
}

export default ModalAddPair;
