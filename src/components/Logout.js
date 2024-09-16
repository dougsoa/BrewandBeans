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
        onLogout();
        navigate('/login');
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

    handleLogout();
  }, [navigate, onLogout]);

  return <div>Logging out...</div>;
};

export default Logout;
