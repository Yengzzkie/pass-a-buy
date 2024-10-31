// PrivateRoute.js
import { Navigate } from 'react-router-dom';
import { useUserCredentials } from '../stores/useDataStore';

const PrivateRoute = ({ children }) => {
  const { loginStatus } = useUserCredentials;

  return loginStatus ? children : <Navigate to="/" />;
};

export default PrivateRoute;
