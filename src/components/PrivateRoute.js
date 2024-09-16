import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Importe o auth do Firebase

const PrivateRoute = ({ element }) => {
  return auth.currentUser ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
