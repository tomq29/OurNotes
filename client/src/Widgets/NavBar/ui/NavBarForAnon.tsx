import { NavLink } from "react-router-dom"


function NavBarForAnon(): JSX.Element {
  return (
    <div className="collapse navbar-collapse ">
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
          to="/auth/login"
        >
          Авторизация
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
          to="/auth/reg"
        >
          Регистрация
        </NavLink>
      </li>
    </ul>
  </div>
)
}

export default NavBarForAnon