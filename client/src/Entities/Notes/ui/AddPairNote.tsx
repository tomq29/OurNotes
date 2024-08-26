import { Button, Modal, TextInput } from '@mantine/core';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../App/providers/store/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createlNote } from '../model/NotesSlice';
import { NoteWithoutIDFolderIDcreatedAt } from '../type/NoteType';
import { useDisclosure } from '@mantine/hooks';

const schema = yup
  .object({
    title: yup
      .string()
      .required('Введите название')
      .min(3, 'Минимум 3 символа'),
    description: yup.string(),
    pairID: yup.number().required(),
    userID: yup.number().required(),
  })
  .required();

function AddPairNote(): JSX.Element {
  const currentUser = useAppSelector((state) => state.currentUserStore);

  const dispatch = useAppDispatch();

  const [opened, { open, close }] = useDisclosure(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      pairID: currentUser.user?.id,
      userID: currentUser.pair?.id,
    },
  });

  async function addNewNote(
    newNote: NoteWithoutIDFolderIDcreatedAt
  ): Promise<void> {
    try {
      dispatch(createlNote(newNote)).then(() => {
        close();
        reset();
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={close}
        title="Создание общей заметки"
      >
        <form onSubmit={handleSubmit(addNewNote)}>
          <TextInput
            variant="filled"
            error={errors.title?.message}
            radius="xl"
            label="Название"
            {...register('title')}
            placeholder="Введите название"
          />

          <TextInput
            variant="filled"
            radius="xl"
            label="Описание"
            {...register('description')}
            placeholder="Введите описание"
          />

          <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'pink', deg: 90 }}
            mt="md"
            type="submit"
          >
            Добавить
          </Button>
        </form>
      </Modal>

      <Button
        variant="gradient"
        gradient={{ from: 'blue', to: 'pink', deg: 90 }}
        onClick={open}
      >
        Создать общую заметку
      </Button>
    </>
  );
}

export default AddPairNote;
