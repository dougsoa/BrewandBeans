import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import coffeeBackground from '../assets/coffee3.jpg'; // Import the background image

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = auth.currentUser;
  const location = useLocation();

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-50 relative"
      style={{
        backgroundImage: `url(${coffeeBackground})`,
        backgroundSize: 'cover', // Ensures the image covers the entire area
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
      }}
    >
      {/* Header */}
      <header className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between z-10">
        <h1 className="text-3xl font-bold text-dark-brown">
          <Link to="/home" className="hover:text-red-600">Brew & Beans</Link>
        </h1>

        {/* Hamburger Menu Icon */}
        <button onClick={toggleMenu} className="md:hidden flex items-center p-2">
          <span className="text-dark-brown text-2xl">
            {isMenuOpen ? '✖' : '☰'}
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-dark-brown font-medium">
            <li>
              <Link to="/home" className={`hover:text-red-600 transition ${location.pathname === '/home' ? 'text-red-600 font-bold' : ''}`}>Home</Link>
            </li>
            <li>
              <Link to="/about" className={`hover:text-red-600 transition ${location.pathname === '/about' ? 'text-red-600 font-bold' : ''}`}>About</Link>
            </li>
            <li>
              <Link to="/contact" className={`hover:text-red-600 transition ${location.pathname === '/contact' ? 'text-red-600 font-bold' : ''}`}>Contact</Link>
            </li>
            {user && (
              <>
                <li>
                  <Link to="/coffees" className={`hover:text-red-600 transition ${location.pathname === '/coffees' ? 'text-red-600 font-bold' : ''}`}>Coffees</Link>
                </li>
                <li>
                  <Link to="/coffee-recipes" className={`hover:text-red-600 transition ${location.pathname === '/coffee-recipes' ? 'text-red-600 font-bold' : ''}`}>Coffee Recipes</Link>
                </li>
                <li>
                  <Link to="/ranking" className={`hover:text-red-600 transition ${location.pathname === '/ranking' ? 'text-red-600 font-bold' : ''}`}>Ranking</Link>
                </li>
              </>
            )}
            {user ? (
              <li>
                <button onClick={handleLogout} className="hover:text-red-600 transition">Logout</button>
              </li>
            ) : (
              <li>
                <Link to="/login" className={`hover:text-red-600 transition ${location.pathname === '/login' ? 'text-red-600 font-bold' : ''}`}>Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {/* Mobile Navigation Menu */}
      <div className={`fixed inset-0 bg-white transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full">
          <button onClick={toggleMenu} className="absolute top-4 right-4 text-dark-brown text-2xl">✖</button>
          <ul className="space-y-8 text-dark-brown font-medium text-xl">
            <li>
              <Link to="/home" onClick={toggleMenu} className={`hover:text-red-600 transition ${location.pathname === '/home' ? 'text-red-600 font-bold' : ''}`}>Home</Link>
            </li>
            <li>
              <Link to="/about" onClick={toggleMenu} className={`hover:text-red-600 transition ${location.pathname === '/about' ? 'text-red-600 font-bold' : ''}`}>About</Link>
            </li>
            <li>
              <Link to="/contact" onClick={toggleMenu} className={`hover:text-red-600 transition ${location.pathname === '/contact' ? 'text-red-600 font-bold' : ''}`}>Contact</Link>
            </li>
            {user && (
              <>
                <li>
                  <Link to="/coffees" onClick={toggleMenu} className={`hover:text-red-600 transition ${location.pathname === '/coffees' ? 'text-red-600 font-bold' : ''}`}>Coffees</Link>
                </li>
                <li>
                  <Link to="/coffee-recipes" onClick={toggleMenu} className={`hover:text-red-600 transition ${location.pathname === '/coffee-recipes' ? 'text-red-600 font-bold' : ''}`}>Coffee Recipes</Link>
                </li>
                <li>
                  <Link to="/ranking" onClick={toggleMenu} className={`hover:text-red-600 transition ${location.pathname === '/ranking' ? 'text-red-600 font-bold' : ''}`}>Ranking</Link>
                </li>
              </>
            )}
            {user ? (
              <li>
                <button onClick={handleLogout} className="hover:text-red-600 transition">Logout</button>
              </li>
            ) : (
              <li>
                <Link to="/login" onClick={toggleMenu} className={`hover:text-red-600 transition ${location.pathname === '/login' ? 'text-red-600 font-bold' : ''}`}>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Main content */}
      <main className={`flex-grow p-4 transition-opacity duration-300 ${isMenuOpen ? 'opacity-50' : 'opacity-100'}`}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full bg-dark-brown text-white text-center py-4">
        <p className="text-sm">© 2024 Brew & Beans. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
