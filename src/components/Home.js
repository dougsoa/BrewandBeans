import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import coffeeBackground from '../assets/coffee3.jpg'; // Import the background image
import { auth } from '../firebaseConfig';

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Cleanup the subscription
    return () => unsubscribe();
  }, []);

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${coffeeBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Text overlay on the background image */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-50">
        <div className="text-white p-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2">
            Welcome to Brew & Beans!
          </h2>
          <p className="text-sm md:text-lg mb-4">
            Add and manage your coffees with ease.
          </p>

          {/* Show login button if not authenticated */}
          {!isAuthenticated && (
            <Link
              to="/login"
              className="mt-4 inline-block px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-full transition-colors duration-300 hover:bg-green-600 shadow-lg"
              role="button"
              aria-label="Login to Brew & Beans"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
