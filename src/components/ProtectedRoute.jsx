import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { userContext } from '../App';

function ProtectedRoute({ component }) {
  const user = useContext(userContext);
  if (!user.token || !localStorage.getItem('token')) {
    return <Redirect to="/login" />;
  }
  return <>{component}</>;
}

export default ProtectedRoute;
