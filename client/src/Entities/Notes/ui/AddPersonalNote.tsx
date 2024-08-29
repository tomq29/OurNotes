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
      .trim()
      .min(3, 'Минимум 3 символа'),
    description: yup.string().trim(),
    userID: yup.number().required(),
  })
  .required();

function AddPersonalNote(): JSX.Element {
  const currentUser = useAppSelector((state) => state.currentUserStore.user);

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
    defaultValues: { userID: currentUser?.id },
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
        title="Создание новой заметки"
        transitionProps={{ transition: 'fade', duration: 200 }}
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

          {/* <TextInput
            variant="filled"
            radius="xl"
            label="Описание"
            {...register('description')}
            placeholder="Введите описание"
          /> */}

          <Button mt="md" type="submit">
            Добавить
          </Button>
        </form>
      </Modal>

      <Button onClick={open}>Создать личную заметку</Button>
    </>
  );
}

export default AddPersonalNote;
