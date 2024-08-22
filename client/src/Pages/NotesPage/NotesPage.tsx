import {  useEffect, useState } from 'react';

import NoteCard from '../../Entities/Notes/ui/NoteCard';


import AddNewCard from '../../Entities/Notes/ui/AddNewCard';
import Spinner from '../../Shared/LoadingSpinner/Spinner';
import {
  useAppDispatch,
  useAppSelector,
} from '../../App/providers/store/store';
import { getAllNotes } from '../../Entities/Notes/model/NotesSlice';

function NotesPage(): JSX.Element {
  const [addMode, setAddMode] = useState(false);
 

  const dispatch = useAppDispatch();

  const { notes, loading } = useAppSelector((state) => state.notesStore);

  useEffect(() => {
    if (notes.length === 0) {
      dispatch(getAllNotes()).catch(console.log);
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

      <div className="container d-flex flex-wrap">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default NotesPage;
