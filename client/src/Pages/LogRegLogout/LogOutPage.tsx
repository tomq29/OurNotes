import { useNavigate } from 'react-router-dom';

import {
  useAppDispatch,
  useAppSelector,
} from '../../App/providers/store/store';
import { logoutUser } from '../../Entities/User/model/CurrentUserSlice';
import { clearNotes } from '../../Entities/Notes/model/NotesSlice';

function LogOutPage(): JSX.Element {
  const currentUser = useAppSelector((state) => state.currentUserStore.user);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(clearNotes());
    dispatch(logoutUser())
      .then(() => navigate('/'))
      .catch(console.log);
  };

  return (
    <>
      <div className="vstack gap-2 col-md-5 mx-auto">
        <div> {currentUser?.login}, Вы точно хотите выйти?</div>
        <button
          onClick={logoutHandler}
          type="button"
          className="btn btn-outline-secondary"
        >
          Да!
        </button>
        <button
          onClick={() => navigate('/')}
          type="button"
          className="btn btn-outline-success"
        >
          Нет, хочу остаться
        </button>
      </div>
    </>
  );
}

export default LogOutPage;
