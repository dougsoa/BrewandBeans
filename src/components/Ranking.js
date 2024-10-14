import React from 'react';

function Ranking({ coffees = [] }) { // Default to an empty array
  // Ordena os cafés com base no rating de forma decrescente
  const sortedCoffees = coffees.sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#fffbf0] to-[#f0eae3] flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Coffee Ranking</h1>
      
      <ul className="space-y-4">
        {sortedCoffees.map((coffee, index) => (
          <li key={coffee.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-800 mr-4">{index + 1}.</span> {/* Posição no ranking */}
              <span className="text-lg font-medium text-gray-700">{coffee.name}</span> {/* Nome do café */}
            </div>
            <span className="text-lg text-gray-500">Rating: {coffee.rating}</span> {/* Rating */}
          </li>
        ))}
      </ul>

      {sortedCoffees.length === 0 && (
        <div className="mt-6 text-center text-gray-500">
          <p>There are no cafes to display in the ranking.</p>
        </div>
      )}
    </div>
  );
}

export default Ranking;
