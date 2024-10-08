import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import CoffeeRecipes from './components/CoffeeRecipes';
import Ranking from './components/Ranking';
import Coffees from './components/Coffees';
import Contact from './components/Contact';
import Logout from './components/Logout';
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About'; // Importe o componente About
import PrivateRoute from './components/PrivateRoute'; // Certifique-se de que o caminho está correto
import Layout from './components/Layout'; // Importe o Layout

function AppRoutes({ isAuthenticated, setIsAuthenticated, onLogin }) {
  return (
    <Routes>
      {/* Rotas públicas com Layout */}
      <Route element={<Layout />}>
        <Route path="/about" element={<About />} /> {/* Rota para About */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Navigate to="/home" />} /> {/* Redireciona para Home */}
        <Route path="/home" element={<Home />} /> {/* Home sempre acessível */}
      </Route>

      {/* Rotas públicas sem Layout */}
      <Route path="/login" element={<Login onLogin={onLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout onLogout={() => setIsAuthenticated(false)} />} />

      {/* Rotas protegidas */}
      <Route element={<PrivateRoute element={<Layout />} />}>
        <Route path="/coffee-recipes" element={<CoffeeRecipes />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/coffees" element={<Coffees />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
