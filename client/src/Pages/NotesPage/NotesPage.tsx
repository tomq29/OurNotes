import { useEffect, useState } from 'react';

import AddNewCard from '../../Entities/Notes/ui/AddNewCard';
import Spinner from '../../Shared/LoadingSpinner/Spinner';
import {
  useAppDispatch,
  useAppSelector,
} from '../../App/providers/store/store';
import { getUsersNotes } from '../../Entities/Notes/model/NotesSlice';
import { Container, Table } from '@mantine/core';
import NoteCardv2 from '../../Entities/Notes/ui/NoteCardv2';

function NotesPage(): JSX.Element {
  const [addMode, setAddMode] = useState(false);

  const dispatch = useAppDispatch();

  const { notes, loading } = useAppSelector((state) => state.notesStore);
  const currentUser = useAppSelector((state) => state.currentUserStore.user);

  useEffect(() => {
    if (notes.length === 0 && currentUser) {
      dispatch(getUsersNotes(currentUser.id)).catch(console.log);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      {addMode ? (
        <>
          <AddNewCard setAddMode={setAddMode} />
        </>
      ) : (
        <>
          <div style={{ width: '10%', margin: ' 0 auto' }}>
            <button
              onClick={() => setAddMode((prev) => !prev)}
              type="button"
              className="btn btn-outline-success"
            >
              Добавить новую заметку
            </button>
          </div>
        </>
      )}

      <Container>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Название</Table.Th>
                <Table.Th>Описание</Table.Th>
                <Table.Th>Тип</Table.Th>
                <Table.Th>Дата изменения</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {notes.map((note) => (
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
