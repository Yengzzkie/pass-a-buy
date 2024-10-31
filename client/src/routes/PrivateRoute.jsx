// PrivateRoute.js
import { Navigate } from 'react-router-dom';
import useDataStore from '../stores/useDataStore';

const PrivateRoute = ({ children }) => {
  const { loginStatus } = useDataStore();

  return loginStatus ? children : <Navigate to="/" />;
};

export default PrivateRoute;
