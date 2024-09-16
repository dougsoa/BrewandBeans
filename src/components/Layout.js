// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom'; // Certifique-se de que não há importações duplicadas
import { auth } from '../firebaseConfig'; // Importe o auth do Firebase

const Layout = ({ onLogout }) => {
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        // Redirecionar para a página de login após o logout
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error);
      });
  };

  const user = auth.currentUser;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Menu superior */}
      <header className="w-full bg-white shadow-md py-4 px-8 flex items-center">
        <h1 className="text-2xl font-bold text-dark-brown">
          <a href="/home">Brew & Beans</a>
        </h1>
        <p className="text-xl font-semibold text-red-600 ml-2">カフェ</p>
        <nav className="ml-auto">
          <ul className="flex space-x-8 text-dark-brown font-medium">
            <li><a href="/home" className="hover:text-red-600">Home</a></li>
            <li><a href="/about" className="hover:text-red-600">About</a></li>
            <li><a href="/contact" className="hover:text-red-600">Contact</a></li>
            {user && (
              <>
                <li><a href="/coffees" className="hover:text-red-600">Coffees</a></li>
                <li><a href="/coffee-recipes" className="hover:text-red-600">Coffee Recipes</a></li>
                <li><a href="/ranking" className="hover:text-red-600">Ranking</a></li>
              </>
            )}
            {user ? (
              <li><button onClick={handleLogout} className="hover:text-red-600">Logout</button></li>
            ) : (
              <li><a href="/login" className="hover:text-red-600">Login</a></li>
            )}
          </ul>
        </nav>
      </header>

      {/* Conteúdo da página */}
      <main className="flex-grow">
        <Outlet /> {/* Renderiza o conteúdo das rotas */}
      </main>

      {/* Rodapé */}
      <footer className="fixed bottom-0 w-full bg-dark-brown text-white text-center py-4">
        <p className="text-sm">© 2024 Brew & Beans. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
