import React from 'react';
import coffeeBackground from '../assets/coffee3.jpg'; // Import the background image

function Home() {
  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${coffeeBackground})`,
        backgroundSize: 'cover', // Ensures the image covers the entire area
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
      }}
    >
      {/* Text overlay on the background image */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-50 transition-opacity duration-300">
        <div className="text-white p-4 md:p-6 lg:p-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 transition-transform duration-300 transform hover:scale-105">
            Welcome to Brew & Beans!
          </h2>
          <p className="text-sm md:text-lg mb-4">
            Add and manage your cafes with ease.
          </p>
          <a
            href="/about" // Adjust link as needed
            className="inline-block px-4 py-2 text-base md:px-6 md:py-3 font-semibold text-white bg-red-500 rounded-full transition-colors duration-300 hover:bg-red-600"
            role="button"
            aria-label="Learn more about Brew & Beans"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
