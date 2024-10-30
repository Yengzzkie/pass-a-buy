// PrivateRoute.js
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginStatusContext } from '../context/context'; 

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(LoginStatusContext);

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
