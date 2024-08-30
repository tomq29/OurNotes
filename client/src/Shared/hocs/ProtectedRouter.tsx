import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';
import { User } from '../../Entities/User/type/UserType';

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
  return isAllowed ? children : <Navigate to={redirect} replace />;
}

export default ProtectedRouter;
