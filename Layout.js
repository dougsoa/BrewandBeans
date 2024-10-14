import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import coffeeBackground from '../assets/coffee3.jpg'; // Import the background image

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track login status
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage hamburger menu visibility
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication state when the component mounts
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user); // User is logged in or not
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
    setIsMenuOpen((prev) => !prev); // Toggle the hamburger menu
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

        {/* Mobile Hamburger Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-dark-brown">
          {isMenuOpen ? '✖' : '☰'} {/* Simple icon for the button */}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-dark-brown font-medium">
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
        <div className="absolute top-0 left-0 w-full h-full bg-white z-20 flex flex-col items-center justify-center">
          <button onClick={toggleMenu} className="absolute top-4 right-4 text-2xl text-dark-brown">✖</button>
          <ul className="flex flex-col space-y-4 text-dark-brown font-medium">
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
