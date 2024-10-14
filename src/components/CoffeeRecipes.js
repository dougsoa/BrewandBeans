import React, { useState } from 'react';

function CoffeeRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [preparation, setPreparation] = useState('');
  const [notes, setNotes] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  const updateIngredient = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addRecipe = () => {
    if (editIndex !== null) {
      const updatedRecipes = [...recipes];
      updatedRecipes[editIndex] = {
        name: recipeName,
        ingredients,
        preparation,
        notes,
      };
      setRecipes(updatedRecipes);
      setEditIndex(null);
    } else {
      const newRecipe = {
        name: recipeName,
        ingredients,
        preparation,
        notes,
      };
      setRecipes([...recipes, newRecipe]);
    }
    setRecipeName('');
    setIngredients(['']);
    setPreparation('');
    setNotes('');
    setShowForm(false);
  };

  const deleteRecipe = (indexToDelete) => {
    const filteredRecipes = recipes.filter((_, index) => index !== indexToDelete);
    setRecipes(filteredRecipes);
  };

  const editRecipe = (index) => {
    const recipeToEdit = recipes[index];
    setRecipeName(recipeToEdit.name);
    setIngredients(recipeToEdit.ingredients);
    setPreparation(recipeToEdit.preparation);
    setNotes(recipeToEdit.notes);
    setShowForm(true);
    setEditIndex(index);
  };

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#fffbf0] to-[#f0eae3] flex flex-col items-center justify-center py-10 px-4">
      <div className="container mx-auto max-w-7xl flex-grow">
        <div className="flex justify-end mb-8">
          <button
            className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-red-600 transition duration-300"
            onClick={() => {
              setShowForm(!showForm);
              setEditIndex(null);
            }}
          >
            {showForm ? '✕' : '+'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8 transition duration-300 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">{editIndex !== null ? 'Edit Recipe' : 'Add New Recipe'}</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Recipe Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder="Enter recipe name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Ingredients</label>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="mb-2 flex">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    placeholder={`Ingredient ${index + 1}`}
                  />
                </div>
              ))}
              <button
                type="button"
                className="text-red-500 hover:text-red-600 font-medium mt-2"
                onClick={addIngredientField}
              >
                Add Ingredient
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Preparation</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                value={preparation}
                onChange={(e) => setPreparation(e.target.value)}
                placeholder="Describe the preparation method"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Notes</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional notes"
              />
            </div>

            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-red-600 transition duration-300"
              onClick={addRecipe}
            >
              {editIndex !== null ? 'Save Changes' : 'Add Recipe'}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 relative group cursor-pointer hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                onClick={() => openModal(recipe)}
              >
                <h3 className="text-2xl font-semibold mb-2 text-red-600">{recipe.name}</h3>
                <p className="text-gray-700 mb-2">Click for details</p>

                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md shadow-md hover:bg-yellow-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      editRecipe(index);
                    }}
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md shadow-md hover:bg-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteRecipe(index);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No recipes added yet.</p>
          )}
        </div>

        {/* Modal for displaying recipe details */}
        {selectedRecipe && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
            <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3 transform transition-transform duration-300 scale-100">
              <h2 className="text-2xl font-semibold mb-4">{selectedRecipe.name}</h2>
              <p className="font-bold text-gray-700 mb-1">Ingredients:</p>
              <ul className="list-disc pl-5 mb-2">
                {selectedRecipe.ingredients.map((ingredient, i) => (
                  <li key={i} className="text-gray-700">{ingredient}</li>
                ))}
              </ul>
              <p className="font-bold text-gray-700 mb-1">Preparation:</p>
              <p className="text-gray-600 mb-2">{selectedRecipe.preparation}</p>
              {selectedRecipe.notes && (
                <>
                  <p className="font-bold text-gray-700 mb-1">Notes:</p>
                  <p className="text-gray-600">{selectedRecipe.notes}</p>
                </>
              )}
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoffeeRecipes;
