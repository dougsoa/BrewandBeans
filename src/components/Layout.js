import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import coffeeBackground from '../assets/coffee3.jpg'; // Import the background image

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track login status
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control hamburger menu visibility
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication state when the component mounts
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true); // User is logged in
      } else {
        setIsAuthenticated(false); // User is not logged in
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setIsAuthenticated(false); // Set user as logged out
        navigate('/home'); // Redirect to the Home page after logout
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-50 relative"
      style={{
        backgroundImage: `url(${coffeeBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Header */}
      <header className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between z-10">
        <h1 className="text-3xl font-bold text-dark-brown">
          <Link to="/home" className="hover:text-red-600">Brew & Beans</Link>
        </h1>

        {/* Hamburger Menu for mobile */}
        <button className="md:hidden text-dark-brown" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-dark-brown font-medium">
            {/* Always visible routes */}
            <li>
              <Link to="/home" className={`hover:text-red-600 transition ${location.pathname === '/home' ? 'text-red-600 font-bold' : ''}`}>Home</Link>
            </li>
            {/* Show only if user is NOT authenticated */}
            {!isAuthenticated && (
              <li>
                <Link to="/login" className={`hover:text-red-600 transition ${location.pathname === '/login' ? 'text-red-600 font-bold' : ''}`}>Login</Link>
              </li>
            )}
            {/* Show only if user is authenticated */}
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/about" className={`hover:text-red-600 transition ${location.pathname === '/about' ? 'text-red-600 font-bold' : ''}`}>About</Link>
                </li>
                <li>
                  <Link to="/contact" className={`hover:text-red-600 transition ${location.pathname === '/contact' ? 'text-red-600 font-bold' : ''}`}>Contact</Link>
                </li>
                <li>
                  <Link to="/coffees" className={`hover:text-red-600 transition ${location.pathname === '/coffees' ? 'text-red-600 font-bold' : ''}`}>Coffees</Link>
                </li>
                <li>
                  <Link to="/coffee-recipes" className={`hover:text-red-600 transition ${location.pathname === '/coffee-recipes' ? 'text-red-600 font-bold' : ''}`}>Coffee Recipes</Link>
                </li>
                <li>
                  <Link to="/ranking" className={`hover:text-red-600 transition ${location.pathname === '/ranking' ? 'text-red-600 font-bold' : ''}`}>Ranking</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:text-red-600 transition">Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-20 flex flex-col items-center justify-center" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute top-4 right-4 cursor-pointer" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <ul className="flex flex-col space-y-4 text-dark-brown font-medium">
            <li>
              <Link to="/home" className="hover:text-red-600 transition" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            {/* Show only if user is NOT authenticated */}
            {!isAuthenticated && (
              <li>
                <Link to="/login" className="hover:text-red-600 transition" onClick={() => setIsMenuOpen(false)}>Login</Link>
              </li>
            )}
            {/* Show only if user is authenticated */}
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/about" className="hover:text-red-600 transition" onClick={() => setIsMenuOpen(false)}>About</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-red-600 transition" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                </li>
                <li>
                  <Link to="/coffees" className="hover:text-red-600 transition" onClick={() => setIsMenuOpen(false)}>Coffees</Link>
                </li>
                <li>
                  <Link to="/coffee-recipes" className="hover:text-red-600 transition" onClick={() => setIsMenuOpen(false)}>Coffee Recipes</Link>
                </li>
                <li>
                  <Link to="/ranking" className="hover:text-red-600 transition" onClick={() => setIsMenuOpen(false)}>Ranking</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:text-red-600 transition" onClick={() => setIsMenuOpen(false)}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full bg-dark-brown text-white text-center py-4">
        <p className="text-sm">© 2024 Brew & Beans. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
