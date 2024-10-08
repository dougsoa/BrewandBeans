import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Importe o auth do Firebase

const PrivateRoute = ({ element, redirectTo = "/home" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false); // Autenticação verificada
    });

    return () => unsubscribe(); // Limpeza ao desmontar o componente
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Ou coloque um spinner aqui, se preferir
  }

  return isAuthenticated ? element : <Navigate to={redirectTo}/>;
};

export default PrivateRoute;
