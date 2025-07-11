import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLogged } from '../context/Logged';


export const Authentication = ({children}) => {
     const { logged } = useLogged();
  return logged ? children : <Navigate to="/login" replace />;
}
