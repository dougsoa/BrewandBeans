// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register'; // Adiciona o import para Register
import CoffeeRecipes from './components/CoffeeRecipes';
import Ranking from './components/Ranking';
import Coffees from './components/Coffees';
import About from './components/About';
import Contact from './components/Contact';
import { auth } from './firebaseConfig';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setIsAuthenticated(false);
      navigate('/home'); // Redireciona para a home ao fazer logout
    });
  };

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> {/* Adiciona a rota para Register */}
      <Route path="/coffee-recipes" element={isAuthenticated ? <CoffeeRecipes /> : <Login />} />
      <Route path="/ranking" element={isAuthenticated ? <Ranking /> : <Login />} />
      <Route path="/coffees" element={isAuthenticated ? <Coffees /> : <Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Home />} /> {/* Redireciona para a Home por padrão */}
    </Routes>
  );
}

export default App;
