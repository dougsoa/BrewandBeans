import React, { useState } from 'react';

function AddCoffee() {
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
  const [coffeeList, setCoffeeList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [filters, setFilters] = useState({
    temperature: 'Hot',
    bitterness: '',
    aroma: '',
    acidity: '',
    body: '',
    sweetness: '',
    date: '',
  });
  const [searchAttribute, setSearchAttribute] = useState('bitterness');
  const [searchRating, setSearchRating] = useState('');
  const [filteredCoffeeList, setFilteredCoffeeList] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (e) => {
    if (e.target.value === '') {
      e.target.placeholder = '';
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    if (value >= 0 && value <= 5) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const calculateAverageRating = () => {
    const { bitterness, aroma, acidity, body, sweetness } = formData;
    const ratings = [bitterness, aroma, acidity, body, sweetness].map(Number);
    const total = ratings.reduce((acc, curr) => acc + curr, 0);
    const average = total / 5;
    setAverageRating(average.toFixed(1));
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      // Update existing coffee
      const updatedList = coffeeList.map((coffee, index) =>
        index === editingIndex
          ? { ...formData, image, averageRating }
          : coffee
      );
      setCoffeeList(updatedList);
      setEditingIndex(null);
    } else {
      // Add new coffee
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
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(coffeeList[index]);
    setImage(coffeeList[index].image);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updatedCoffeeList = coffeeList.filter((_, i) => i !== index);
    setCoffeeList(updatedCoffeeList);
  };

  const applyFilters = (coffee) => {
    return Object.keys(filters).every((key) => {
      if (filters[key] === '') return true;
      if (key === 'temperature') return coffee[key] === filters[key];
      return coffee[key].toString().includes(filters[key]);
    });
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
                      className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-3 rounded-lg shadow-md"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg shadow-md"
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
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={resetForm}
            >
              <span className="text-2xl">×</span>
            </button>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
                Coffee Name
              </label>
              <input
                type="text"
                name="coffeeName"
                value={formData.coffeeName}
                onChange={handleInputChange}
                className="w-full p-3 border border-black rounded-lg shadow-sm"
                placeholder="Coffee Name"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-3 border border-black rounded-lg shadow-sm"
                placeholder="Location"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
                Temperature
              </label>
              <select
                name="temperature"
                value={formData.temperature}
                onChange={handleInputChange}
                className="w-full p-3 border border-black rounded-lg shadow-sm"
              >
                <option value="Hot">Hot</option>
                <option value="Cold">Cold</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
                Bitterness (0-5)
              </label>
              <input
                type="number"
                name="bitterness"
                value={formData.bitterness}
                onChange={handleNumberChange}
                className="w-full p-3 border border-black rounded-lg shadow-sm"
                placeholder="Bitterness"
                min="0"
                max="5"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
                Aroma (0-5)
              </label>
              <input
                type="number"
                name="aroma"
                value={formData.aroma}
                onChange={handleNumberChange}
                className="w-full p-3 border border-black rounded-lg shadow-sm"
                placeholder="Aroma"
                min="0"
                max="5"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
                Acidity (0-5)
              </label>
              <input
                type="number"
                name="acidity"
                value={formData.acidity}
                onChange={handleNumberChange}
                className="w-full p-3 border border-black rounded-lg shadow-sm"
                placeholder="Acidity"
                min="0"
                max="5"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
                Body (0-5)
              </label>
              <input
                type="number"
                name="body"
                value={formData.body}
                onChange={handleNumberChange}
                className="w-full p-3 border border-black rounded-lg shadow-sm"
                placeholder="Body"
                min="0"
                max="5"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
                Sweetness (0-5)
              </label>
              <input
                type="number"
                name="sweetness"
                value={formData.sweetness}
                onChange={handleNumberChange}
                className="w-full p-3 border border-black rounded-lg shadow-sm"
                placeholder="Sweetness"
                min="0"
                max="5"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-3 border border-black rounded-lg shadow-sm"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full p-3 border border-black rounded-lg shadow-sm"
                placeholder="Notes"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
                Image
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-3 border border-black rounded-lg shadow-sm"
              />
              {image && <img src={image} alt="Selected Coffee" className="mt-4 w-full h-40 object-cover rounded-lg" />}
            </div>

            <div className="flex justify-between">
              <button
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                onClick={() => {
                  calculateAverageRating();
                  handleSave();
                }}
              >
                Save
              </button>
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default AddCoffee;
