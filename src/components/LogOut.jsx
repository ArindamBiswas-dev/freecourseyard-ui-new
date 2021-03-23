import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { setUserContext, userContext } from '../App';

function LogOut() {
  const user = useContext(userContext);
  const setUser = useContext(setUserContext);

  if (!user.token) {
    return <Redirect to="/" />;
  }

  localStorage.removeItem('token');
  setUser({});

  return <Redirect to="/" />;
}

export default LogOut;
