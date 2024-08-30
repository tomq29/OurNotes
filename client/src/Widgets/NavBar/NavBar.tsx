import { useAppSelector } from '../../App/providers/store/store';
import NavBarForUser from './ui/NavBarForUser';
import NavBarForAnon from './ui/NavBarForAnon';

function NavBar(): JSX.Element {
  const currentUser = useAppSelector((state) => state.currentUserStore.user);

  return currentUser ? <NavBarForUser /> : <NavBarForAnon />;

  
}

export default NavBar;
