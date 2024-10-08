// src/components/Logout.js
import React, { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        onLogout(); // Atualiza o estado de autenticação
        navigate('/home'); // Redireciona para home
      } catch (error) {
        console.error('Erro ao deslogar', error);
      }
    };

    handleLogout();
  }, [navigate, onLogout]);

  return <div>Logging out...</div>;
};

export default Logout;
