import { useEffect, useState } from 'react';

import { SegmentedControl } from '@mantine/core';
// import classes from './GradientSegmentedControl.module.css';
import Spinner from '../../Shared/LoadingSpinner/Spinner';
import {
  useAppDispatch,
  useAppSelector,
} from '../../App/providers/store/store';
import { getUsersNotes } from '../../Entities/Notes/model/NotesSlice';
import { Container, Flex, Table } from '@mantine/core';
import NoteCardv2 from '../../Entities/Notes/ui/NoteCardv2';
import AddPersonalNote from '../../Entities/Notes/ui/AddPersonalNote';
import AddPairNote from '../../Entities/Notes/ui/AddPairNote';

function NotesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState('Все');
  const { notes, loading } = useAppSelector((state) => state.notesStore);
  const currentUser = useAppSelector((state) => state.currentUserStore.user);
  const currentUserPair = useAppSelector(
    (state) => state.currentUserStore.pair
  );

  useEffect(() => {
    if (notes.length === 0 && currentUser) {
      dispatch(getUsersNotes(currentUser.id)).catch(console.log);
    }
  }, [currentUser]);

  const filteredNotes = notes.filter((note) => {
    if (filter === 'Все') {
      return true;
    }
    if (filter === 'Общие') {
      return typeof note.pairID === 'number';
    }
    if (filter === 'Личные') {
      return !note.pairID;
    }
    return true;
  });

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <Flex mih={70} gap="xl" justify="center" align="center" direction="row">
        <AddPersonalNote />

        {currentUserPair && <AddPairNote />}
      </Flex>

      <Container>
        <SegmentedControl
          value={filter}
          onChange={setFilter}
          radius="xl"
          data={['Все', 'Общие', 'Личные']}
        />
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Название</Table.Th>
                <Table.Th>Описание</Table.Th>
                <Table.Th>Тип</Table.Th>
                <Table.Th>Дата создания</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {filteredNotes.map((note) => (
                <NoteCardv2 key={note.id} note={note} />
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Container>
    </div>
  );
}

export default NotesPage;
