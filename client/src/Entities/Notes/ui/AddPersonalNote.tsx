import {
  Alert,
  Button,
  Container,
  Input,
  Text,
  TextInput,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../App/providers/store/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createlNote } from '../model/NotesSlice';
import { NoteWithoutIDandFolderID } from '../type/NoteType';

const schema = yup
  .object({
    title: yup
      .string()
      .required('Введите название')
      .min(3, 'Минимум 3 символа'),
    description: yup.string(),
    userID: yup.number().required(),
  })
  .required();

function AddPersonalNote(): JSX.Element {
  const currentUser = useAppSelector((state) => state.currentUserStore.user);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: { userID: currentUser?.id },
  });

  async function addNewNote(newNote: NoteWithoutIDandFolderID): Promise<void> {
    try {
      dispatch(createlNote(newNote));
    } catch (error) {
      console.error(error);
    }
  }
  const openModal = () =>
    modals.openConfirmModal({
      title: 'Создание новой заметки',
      children: (
        <Container>
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
        </Container>
      ),
      labels: { confirm: 'Потвердить', cancel: 'Отменить' },

      onConfirm: () => addNewNote,
    });

  return <Button onClick={openModal}>Добавить заметку</Button>;
}

export default AddPersonalNote;
