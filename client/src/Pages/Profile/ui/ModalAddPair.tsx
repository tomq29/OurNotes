import { TextInput, Button } from '@mantine/core';
import { modals } from '@mantine/modals';

function ModalAddPair(): JSX.Element {
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
