import { useAppSelector } from '../../App/providers/store/store';
import NavBarForUser from './ui/NavBarForUser';
import NavBarForAnon from './ui/NavBarForAnon';

function NavBar(): JSX.Element {
  const currentUser = useAppSelector((state) => state.currentUserStore.user);

  return currentUser ? <NavBarForUser /> : <NavBarForAnon />;

  // <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
  //   <div className="container-fluid">
  //     <div className="navbar-brand">
  //       <NavLink className={'nav-link'} to="/">
  //         Домой
  //       </NavLink>
  //     </div>

  //     <button
  //       className="navbar-toggler"
  //       type="button"
  //       data-bs-toggle="collapse"
  //       data-bs-target="#navbarNavDropdown"
  //       aria-controls="navbarNavDropdown"
  //       aria-expanded="false"
  //       aria-label="Toggle navigation"
  //     />
  //     {currentUser ? <NavBarForUser /> : <NavBarForAnon />}
  //   </div>
  // </nav>
}

export default NavBar;
