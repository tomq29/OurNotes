import { useState } from 'react';
import { Note, NoteID } from '../type/NoteType';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../../App/providers/store/store';
import { deleteNote, updateNote } from '../model/NotesSlice';
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  rem,
  Menu,
  TextInput,
} from '@mantine/core';
import {
  IconArrowsLeftRight,
  IconCancel,
  IconCheckbox,
  IconPencil,
  IconTrash,
  IconX,
} from '@tabler/icons-react';

type NoteCardProps = {
  key: NoteID;
  note: Note;
};

const schema = yup
  .object({
    id: yup.number().required(),
    title: yup.string().required(),
    description: yup.string(),
    userID: yup.number().required(),
    folderID: yup.number().nullable(),
    pairID: yup.number().nullable(),
    
  })
  .required();

function NoteCardv2({ note }: NoteCardProps): JSX.Element {
  const [editMode, setEditMode] = useState<boolean>(false);

  const [normalMode, setNormalMode] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      id: note.id,
      title: note.title,
      description: note.description,
      userID: note.userID,
      folderID: note.folderID,
      pairID: note.pairID,
    },
  });


  async function editButtonHadler() {
    const isValidForm = await trigger();

    if (isValidForm) {
      handleSubmit(editNote)();
    }
  }

  async function editNote(editedNote: Note) {
    try {
      dispatch(updateNote(editedNote));

      setEditMode((prev) => !prev);
      setNormalMode((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  }

  function deleteButtonHandler() {
    dispatch(deleteNote(note.id));
  }

  return (
    <Table.Tr>
      <Table.Td>
        <Group gap="sm">
          {/* <Avatar size={30} src={item.avatar} radius={30} /> */}

          {editMode && (
            <TextInput
              variant="filled"
              radius="xl"
              autoFocus
              {...register('title')}
              defaultValue={note.title}
              placeholder="Введите название"
            />
          )}

          {normalMode && (
            <Text fz="sm" fw={500}>
              {note.title}
            </Text>
          )}
        </Group>
      </Table.Td>

      <Table.Td>
        {editMode && (
          <TextInput
            variant="filled"
            radius="xl"
            {...register('description')}
            defaultValue={note.description}
            placeholder="Введите описание"
          />
        )}

        {normalMode && <Text fz="sm">{note.description}</Text>}
      </Table.Td>

      <Table.Td>
        {note.pairID ? (
          <Badge color="cyan" variant="light">
            Общая
          </Badge>
        ) : (
          <Badge color="blue" variant="light">
            Личная
          </Badge>
        )}
      </Table.Td>

      <Table.Td>{new Date(note.createdAt).toLocaleDateString()}</Table.Td>

      <Table.Td>
        <Group gap={0} justify="flex-end">
          {editMode && (
            <div>
              <ActionIcon
                variant="subtle"
                color="green"
                onClick={editButtonHadler}
              >
                <IconCheckbox
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              </ActionIcon>

              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => {
                  setEditMode((prev) => !prev);
                  setNormalMode((prev) => !prev);
                }}
              >
                <IconX
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </div>
          )}

          {normalMode && (
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => {
                setEditMode((prev) => !prev);
                setNormalMode((prev) => !prev);
              }}
            >
              <IconPencil
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </ActionIcon>
          )}

          <Menu position="top">
            <Menu.Target>
              <ActionIcon variant="subtle" color="red">
                <IconTrash
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconCancel style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Отменить
              </Menu.Item>

              <Menu.Item
                color="red"
                leftSection={
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={deleteButtonHandler}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
}

export default NoteCardv2;
