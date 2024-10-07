import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const Layout = () => {
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error);
      });
  };

  const user = auth.currentUser;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Menu superior */}
      <header className="w-full bg-white shadow-lg py-4 px-8 flex items-center">
        <h1 className="text-3xl font-bold text-dark-brown">
          <Link to="/home">Brew & Beans</Link>
        </h1>
        <p className="text-2xl font-semibold text-red-600 ml-2">カフェ</p>
        <nav className="ml-auto">
          <ul className="flex space-x-6 text-dark-brown font-medium">
            <li><Link to="/home" className="hover:text-red-600 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-red-600 transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-red-600 transition">Contact</Link></li>
            {user && (
              <>
                <li><Link to="/coffees" className="hover:text-red-600 transition">Coffees</Link></li>
                <li><Link to="/coffee-recipes" className="hover:text-red-600 transition">Coffee Recipes</Link></li>
                <li><Link to="/ranking" className="hover:text-red-600 transition">Ranking</Link></li>
              </>
            )}
            {user ? (
              <li><button onClick={handleLogout} className="hover:text-red-600 transition">Logout</button></li>
            ) : (
              <li><Link to="/login" className="hover:text-red-600 transition">Login</Link></li>
            )}
          </ul>
        </nav>
      </header>

      {/* Conteúdo da página */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Rodapé */}
      <footer className="w-full bg-dark-brown text-white text-center py-4">
        <p className="text-sm">© 2024 Brew & Beans. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
