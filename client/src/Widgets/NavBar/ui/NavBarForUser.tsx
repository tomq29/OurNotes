
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../App/providers/store/store';

function NavBarForUser(): JSX.Element {
  const currentUser = useAppSelector((state) => state.currentUserStore.user);

  return (
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav">
        <li className="nav-item">
          <div className="nav-link active">
            Добрый день, {currentUser?.login}
          </div>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            to="/notes"
          >
            Заметки
          </NavLink>
        </li>
        {/*  */}
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            to="/questions"
          >
            Вопросы
          </NavLink>
        </li>
        {/*  */}
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            to="/quotes"
          >
            Цитаты
          </NavLink>
        </li>

        {/*  */}
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            to="/objectwriting"
          >
            Object Writing
          </NavLink>
        </li>

        {/*  */}
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            to="/auth/logout"
          >
            Выйти
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavBarForUser;
