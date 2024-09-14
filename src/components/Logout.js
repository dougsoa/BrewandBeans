// src/components/Logout.js
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/home'); // Redireciona para a tela inicial após o logout
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <button onClick={handleLogout} className="bg-dark-brown hover:bg-brown text-white font-bold py-2 px-4 rounded">
      Logout
    </button>
  );
}

export default Logout;
