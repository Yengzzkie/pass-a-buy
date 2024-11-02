import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../stores/useDataStore';

const PrivateRoute = ({ children }) => {
  const { auth } = useUserAuth();

  return auth ? children : <Navigate to="/" />;
};

export default PrivateRoute;
