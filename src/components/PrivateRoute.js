// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Importe o auth do Firebase

const PrivateRoute = ({ children }) => {
  return auth.currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
