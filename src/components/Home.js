// src/components/Home.js
import React from 'react';
import CoffeeCarousel from './CoffeeCarousel'; // Importe o CoffeeCarousel

function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Adiciona o carrossel */}
      <CoffeeCarousel />

      {/* Texto sobre o carrossel */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-10">
        <div className="text-white p-4">
          <h2 className="text-4xl font-bold mb-2">Welcome to Brew & Beans!</h2>
          <p className="text-lg mb-4">Here you can add and manage your cafes.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
