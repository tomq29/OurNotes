import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';
import { User } from '../../Entities/User/type/UserType';
import { useAppSelector } from '../../App/providers/store/store';
import Spinner from '../LoadingSpinner/Spinner';

interface ProtectedRouterProps {
  children: ReactElement;
  isAllowed: User | undefined;
  redirect?: string;
}

function ProtectedRouter({
  children,
  isAllowed,
  redirect = '/',
}: ProtectedRouterProps): JSX.Element {
  const loading = useAppSelector((state) => state.currentUserStore.loading);

  if (loading) {
    return <Spinner />; // Do nothing while loading
  }
  return isAllowed ? children : <Navigate to={redirect} replace />;
}

export default ProtectedRouter;
