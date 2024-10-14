import React, { useState } from 'react';
import CoffeeForm from './CoffeeForm';

const Coffee = () => {
  const [coffeeList, setCoffeeList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  // State for filter values
  const [filterCriteria, setFilterCriteria] = useState('bitterness'); // Default to 'bitterness'
  const [filterValue, setFilterValue] = useState('');

  const handleAddCoffee = (coffee) => {
    setCoffeeList([...coffeeList, coffee]);
    setShowForm(false);
  };

  const handleEditCoffee = (index) => {
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleUpdateCoffee = (updatedCoffee) => {
    const updatedList = coffeeList.map((coffee, index) =>
      index === editingIndex ? updatedCoffee : coffee
    );
    setCoffeeList(updatedList);
    setShowForm(false);
  };

  const handleDeleteCoffee = (index) => {
    const updatedList = coffeeList.filter((_, i) => i !== index);
    setCoffeeList(updatedList);
  };

  const handleCancelEdit = () => {
    setEditingIndex(-1);
    setShowForm(false);
  };

  // Filter coffee list based on selected criteria and filter value
  const filteredCoffeeList = coffeeList.filter((coffee) => {
    if (filterValue === '') return true; // No filter applied

    // Convert filterValue to a number for comparison
    const value = parseFloat(filterValue);

    // Check if the coffee's rating in the selected criteria matches the filter value
    return coffee[filterCriteria] === value;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#fffbf0] to-[#f0eae3] flex flex-col items-center py-10 px-4">
      {showForm && (
        <CoffeeForm
          onSubmit={editingIndex === -1 ? handleAddCoffee : handleUpdateCoffee}
          coffeeData={editingIndex !== -1 ? coffeeList[editingIndex] : null}
          isEditing={editingIndex !== -1}
          onCancel={handleCancelEdit}
        />
      )}

      {/* Filter section */}
      <div className="mb-6 w-full max-w-5xl flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <select
          value={filterCriteria}
          onChange={(e) => setFilterCriteria(e.target.value)}
          className="border border-gray-300 rounded-lg py-3 px-4 text-sm w-full md:w-1/3" // Aumentei o tamanho e a altura
        >
          <option value="bitterness">Bitterness</option>
          <option value="aroma">Aroma</option>
          <option value="acidity">Acidity</option>
          <option value="body">Body</option>
          <option value="sweetness">Sweetness</option>
        </select>

        <input
          type="number"
          placeholder="Rating (0-5)"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="border border-gray-300 rounded-lg py-3 px-4 text-sm w-full md:w-1/3"
          min="0"
          max="5"
        />

        <button
          onClick={() => {
            // Você pode adicionar lógica adicional aqui se necessário
          }}
          className="bg-blue-500 text-white rounded-lg py-3 px-6 text-sm w-full md:w-auto" // Ajuste de largura
        >
          Search
        </button>

        {/* Botão flutuante "+" dentro da seção de filtro */}
        <button
          className="ml-0 md:ml-2 w-10 h-10 text-white bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition flex items-center justify-center"
          onClick={() => {
            if (showForm) {
              setShowForm(false);
            } else {
              setEditingIndex(-1);
              setShowForm(true);
            }
          }}
        >
          {showForm ? 'X' : '+'}
        </button>
      </div>


      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl mt-6">
        {filteredCoffeeList.map((coffee, index) => (
          <li key={index} className="bg-white rounded-lg shadow-md p-4">
            {coffee.image && (
              <img src={coffee.image} alt={coffee.name} className="w-full h-32 object-cover rounded mb-2" />
            )}
            <h3 className="font-bold text-lg">{coffee.name}</h3>
            <p>Location: {coffee.location}</p>
            <p>Temperature: {coffee.temperature}</p>
            <p>Date: {coffee.date}</p>
            <p>Rating: {coffee.averageRating} / 5</p>
            <div className="flex justify-between mt-2">
              <button
                className="mr-2 text-blue-500 hover:underline"
                onClick={() => handleEditCoffee(index)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDeleteCoffee(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Coffee;
