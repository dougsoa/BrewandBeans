import React from 'react';
import CoffeeCarousel from './CoffeeCarousel';

function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Adiciona o carrossel */}
      <CoffeeCarousel />

      {/* Texto sobre o carrossel */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-50 transition-opacity duration-300">
        <div className="text-white p-6">
          <h2 className="text-5xl font-extrabold mb-2">Welcome to Brew & Beans!</h2>
          <p className="text-lg md:text-xl mb-4">Add and manage your cafes with ease.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
