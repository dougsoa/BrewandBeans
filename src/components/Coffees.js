import React, { useState, useEffect } from 'react';

function Coffee() {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    coffeeName: '',
    location: '',
    temperature: 'Hot',
    bitterness: '',
    aroma: '',
    acidity: '',
    body: '',
    sweetness: '',
    date: '',
    notes: '',
  });
  const [averageRating, setAverageRating] = useState(0);
  const [ratingMessage, setRatingMessage] = useState('');
  const [coffeeList, setCoffeeList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchAttribute, setSearchAttribute] = useState('bitterness');
  const [searchRating, setSearchRating] = useState('');
  const [filteredCoffeeList, setFilteredCoffeeList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Função para atualizar a lista de cafés quando o estado mudar
  useEffect(() => {
    const result = coffeeList
      .filter(applyFilters)
      .filter(applyExactRatingFilters);

    if (result.length === 0) {
      setErrorMessage("Oops! I don't think there is any coffee with that rating.");
    } else {
      setErrorMessage('');
    }

    setFilteredCoffeeList(result);
  }, [coffeeList, searchAttribute, searchRating]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    if (value >= 0 && value <= 5) {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const calculateAverageRating = () => {
    const { bitterness, aroma, acidity, body, sweetness } = formData;
    const ratings = [bitterness, aroma, acidity, body, sweetness].map(Number);
    const total = ratings.reduce((acc, curr) => acc + curr, 0);
    const average = total / 5;
    const averageRounded = average.toFixed(1);
    setAverageRating(averageRounded);
    setRatingMessage(`The calculated average rating is ${averageRounded}`);
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      // Atualiza o café existente
      const updatedList = coffeeList.map((coffee, index) =>
        index === editingIndex
          ? { ...formData, image, averageRating }
          : coffee
      );
      setCoffeeList(updatedList);
      setEditingIndex(null);  // Limpa o índice de edição após a atualização
    } else {
      // Adiciona um novo café
      const newCoffee = {
        ...formData,
        image,
        averageRating
      };
      setCoffeeList([...coffeeList, newCoffee]);
    }
    resetForm();
  };

  const resetForm = () => {
    setImage(null);
    setFormData({
      coffeeName: '',
      location: '',
      temperature: 'Hot',
      bitterness: '',
      aroma: '',
      acidity: '',
      body: '',
      sweetness: '',
      date: '',
      notes: '',
    });
    setAverageRating(0);
    setRatingMessage('');  // Limpa a mensagem do rating
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData({
      coffeeName: coffeeList[index].coffeeName,
      location: coffeeList[index].location,
      temperature: coffeeList[index].temperature,
      bitterness: coffeeList[index].bitterness,
      aroma: coffeeList[index].aroma,
      acidity: coffeeList[index].acidity,
      body: coffeeList[index].body,
      sweetness: coffeeList[index].sweetness,
      date: coffeeList[index].date,
      notes: coffeeList[index].notes,
    });
    setImage(coffeeList[index].image);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updatedCoffeeList = coffeeList.filter((_, i) => i !== index);
    setCoffeeList(updatedCoffeeList);
  };

  const applyFilters = (coffee) => {
    // Implementar se precisar filtrar com base nos filtros
    return true;
  };

  const applyExactRatingFilters = (coffee) => {
    if (searchRating === '') return true;
    const rating = Number(searchRating);
    return coffee[searchAttribute] && Number(coffee[searchAttribute]) === rating;
  };

  const handleSearch = () => {
    const result = coffeeList
      .filter(applyFilters)
      .filter(applyExactRatingFilters);

    if (result.length === 0) {
      setErrorMessage("Oops! I don't think there is any coffee with that rating.");
    } else {
      setErrorMessage('');
    }

    setFilteredCoffeeList(result);
  };

  const displayedCoffeeList = filteredCoffeeList.length > 0 ? filteredCoffeeList : coffeeList;

  return (
    <div className="coffees-container min-h-screen bg-gray-50 py-8">
      <section className="max-w-4xl mx-auto px-6 py-12 bg-white shadow-lg rounded-lg">
        {!showForm && (
          <>
            <div className="flex items-center justify-between mb-6">
              <button
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                onClick={() => setShowForm(true)}
              >
                Add Coffee
              </button>

              <div className="flex items-center space-x-4 ml-auto">
                <select
                  name="searchAttribute"
                  value={searchAttribute}
                  onChange={(e) => setSearchAttribute(e.target.value)}
                  className="p-2 border border-black rounded-lg shadow-sm"
                  style={{ width: '160px' }}
                >
                  <option value="bitterness">Bitterness</option>
                  <option value="aroma">Aroma</option>
                  <option value="acidity">Acidity</option>
                  <option value="body">Body</option>
                  <option value="sweetness">Sweetness</option>
                </select>

                <input
                  type="number"
                  name="searchRating"
                  min="0"
                  max="5"
                  value={searchRating}
                  onChange={(e) => setSearchRating(e.target.value)}
                  className="p-2 border border-black rounded-lg shadow-sm"
                  placeholder="Rating (0-5)"
                  style={{ width: '120px' }}
                />

                <button
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-6 text-red-500 font-semibold text-lg">
                {errorMessage}
              </div>
            )}

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCoffeeList.map((coffee, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
                  {coffee.image && (
                    <img
                      src={coffee.image}
                      alt={coffee.coffeeName}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h2 className="text-xl font-semibold mb-2">{coffee.coffeeName}</h2>
                  <p><strong>Location:</strong> {coffee.location}</p>
                  <p><strong>Temperature:</strong> {coffee.temperature}</p>
                  <p><strong>Date:</strong> {coffee.date}</p>
                  <p><strong>Average Rating:</strong> {coffee.averageRating}</p>
                  <div className="flex justify-between mt-4">
                    <button
                      className="text-black-600 hover:text-green-600 font-bold py-1 px-3 rounded-lg"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-black-600 hover:text-red-600 font-bold py-1 px-3 rounded-lg"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {showForm && (
          <div className="bg-white shadow-md rounded-lg p-6 relative border border-gray-300">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 font-bold"
              onClick={() => setShowForm(false)}
            >
              X
            </button>

            <h2 className="text-2xl font-semibold mb-4">{editingIndex !== null ? 'Edit Coffee' : 'Add Coffee'}</h2>

            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Coffee Name</label>
                <input
                  type="text"
                  name="coffeeName"
                  value={formData.coffeeName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter coffee name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter location"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Temperature</label>
                <select
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="Hot">Hot</option>
                  <option value="Cold">Cold</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Bitterness (0-5)</label>
                <input
                  type="number"
                  name="bitterness"
                  min="0"
                  max="5"
                  value={formData.bitterness}
                  onChange={handleNumberChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Aroma (0-5)</label>
                <input
                  type="number"
                  name="aroma"
                  min="0"
                  max="5"
                  value={formData.aroma}
                  onChange={handleNumberChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Acidity (0-5)</label>
                <input
                  type="number"
                  name="acidity"
                  min="0"
                  max="5"
                  value={formData.acidity}
                  onChange={handleNumberChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Body (0-5)</label>
                <input
                  type="number"
                  name="body"
                  min="0"
                  max="5"
                  value={formData.body}
                  onChange={handleNumberChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Sweetness (0-5)</label>
                <input
                  type="number"
                  name="sweetness"
                  min="0"
                  max="5"
                  value={formData.sweetness}
                  onChange={handleNumberChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter any additional notes"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Coffee Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                {image && <img src={image} alt="Coffee" className="mt-4 w-full h-40 object-cover rounded-lg" />}
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={calculateAverageRating}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg"
                >
                  Calculate Rating
                </button>
                <span className="text-gray-700">{ratingMessage}</span>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg"
                >
                  Save Coffee
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}

export default Coffee;
