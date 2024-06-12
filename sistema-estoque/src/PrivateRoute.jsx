// src/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({ component: Component }) => {
  const [cookies] = useCookies(['session']);

  return (
    cookies.session ? Component : <Navigate to="/login" />
  );
}

export default PrivateRoute;
