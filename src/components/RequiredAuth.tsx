import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


const RequiredAuth = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default RequiredAuth;
