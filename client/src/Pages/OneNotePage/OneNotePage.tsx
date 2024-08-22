import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import TextBlock from '../../Entities/Texts/ui/TextBlock';
import Spinner from '../../Shared/LoadingSpinner/Spinner';
import AddNewText from '../../Entities/Texts/ui/AddNewText';
import MyTextBlock from '../../Entities/Texts/ui/MyTextBlock';
import {
  useAppDispatch,
  useAppSelector,
} from '../../App/providers/store/store';
import { getOneNote } from '../../Entities/Notes/model/OneNoteSlice';

function OneNotePage(): JSX.Element {
  const { id } = useParams();

  const currentUser = useAppSelector((state) => state.currentUserStore.user);

  const dispatch = useAppDispatch();

  const { oneNote, loading } = useAppSelector((state) => state.oneNoteStore);

  useEffect(() => {
    dispatch(getOneNote(Number(id))).catch(console.log);

    return;
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <h5 className="text-center h1">Название: {oneNote.title}</h5>
      <p className="text-center h4">Описание: {oneNote.description}</p>

      {oneNote.Texts.map((text) =>
        text.userID === currentUser?.id ? (
          <MyTextBlock key={text.id} text={text} />
        ) : (
          <TextBlock key={text.id} text={text} />
        )
      )}

      <AddNewText />
    </div>
  );
}

export default OneNotePage;
