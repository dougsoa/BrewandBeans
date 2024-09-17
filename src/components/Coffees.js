import React, { useState } from 'react';

function AddCoffee() {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
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
    location: '',
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
    const newCoffee = {
      ...formData,
      image,
      averageRating
    };
    if (editingIndex !== null) {
      const updatedCoffeeList = coffeeList.map((coffee, index) =>
        index === editingIndex ? newCoffee : coffee
      );
      setCoffeeList(updatedCoffeeList);
      setEditingIndex(null);
    } else {
      setCoffeeList([...coffeeList, newCoffee]);
    }
    resetForm();
  };

  const resetForm = () => {
    setImage(null);
    setFormData({
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

  const infoMessages = {
    bitterness: 'Amargor: Sensação amarga no fundo da língua. Em cafés de qualidade, deve ser leve e discreto. Amargor intenso pode indicar torra escura ou contato excessivo com a água.',
    aroma: 'Aroma: O cheiro do café. Grãos com torrefação clara têm aromas de amêndoas e nozes, enquanto torrefações escuras têm aromas de especiarias e queimado. Aroma ruim indica baixa qualidade.',
    acidity: 'Acidez: Sensação nas laterais da língua. Deve ser fresca e cítrica. Em torrefações claras, a acidez é mais pronunciada e desejável. Evite acidez azeda.',
    sweetness: 'Doçura: Sentida na ponta da língua. Grãos maduros proporcionam doçura natural, como caramelo e chocolate. Grãos verdes ou estragados têm baixa doçura.',
    body: 'Corpo: Persistência da bebida no paladar. Pode ser intenso e viscoso ou leve e delicado, dependendo da torra e variedade dos grãos.',
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = (coffee) => {
    return Object.keys(filters).every((key) => {
      if (filters[key] === '') return true;
      if (key === 'temperature') return coffee[key] === filters[key];
      return coffee[key].toString().includes(filters[key]);
    });
  };

  const applySearchFilters = (coffee) => {
    if (searchRating === '') return true;
    return coffee[searchAttribute] && Number(coffee[searchAttribute]) === Number(searchRating);
  };

  const handleSearch = () => {
    const result = coffeeList
      .filter(applyFilters)
      .filter(applySearchFilters);
    setFilteredCoffeeList(result);
  };

  const displayedCoffeeList = filteredCoffeeList.length > 0 ? filteredCoffeeList : coffeeList;

  return (
    <div className="coffees-container min-h-screen bg-gray-50 py-8">
      <section className="max-w-4xl mx-auto px-6 py-12 bg-white shadow-lg rounded-lg">
        {!showForm && (
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
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
                Coffee Image
              </label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-3 border border-black rounded-lg shadow-sm" />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
                Location
                <span className="ml-2 text-gray-600 text-sm cursor-help" title="Onde o café foi cultivado">
                  <i className="fas fa-info-circle"></i>
                </span>
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
                <span className="ml-2 text-gray-600 text-sm cursor-help" title="Temperatura do café">
                  <i className="fas fa-info-circle"></i>
                </span>
              </label>
              <select
                name="temperature"
                value={formData.temperature}
                onChange={handleInputChange}
                className="w-full p-3 border border-black rounded-lg shadow-sm"
              >
                <option value="Hot">Hot</option>
                <option value="Warm">Warm</option>
                <option value="Cold">Cold</option>
              </select>
            </div>

            {['bitterness', 'aroma', 'acidity', 'body', 'sweetness'].map((field) => (
              <div key={field} className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  <span className="ml-2 text-gray-600 text-sm cursor-help" title={infoMessages[field]}>
                    <i className="fas fa-info-circle"></i>
                  </span>
                </label>
                <input
                  type="number"
                  name={field}
                  value={formData[field]}
                  onChange={handleNumberChange}
                  onFocus={handleFocus}
                  min="0"
                  max="5"
                  className="w-full p-3 border border-black rounded-lg shadow-sm"
                  placeholder="0"
                />
              </div>
            ))}

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
                Date
                <span className="ml-2 text-gray-600 text-sm cursor-help" title="Data em que o café foi degustado">
                  <i className="fas fa-info-circle"></i>
                </span>
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
                <span className="ml-2 text-gray-600 text-sm cursor-help" title="Notas adicionais sobre o café">
                  <i className="fas fa-info-circle"></i>
                </span>
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-3 border border-black rounded-lg shadow-sm"
                placeholder="Any additional notes..."
              />
            </div>

            <div className="flex gap-4">
              <button
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                onClick={calculateAverageRating}
              >
                Calculate Average Rating
              </button>
            </div>

            {averageRating > 0 && (
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold">Average Rating: {averageRating}/5</p>
              </div>
            )}
          </div>
        )}

        {displayedCoffeeList.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Added Coffees</h2>
            <div className="space-y-4">
              {displayedCoffeeList.map((coffee, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-6 flex items-center relative border border-gray-300">
                  <div className="absolute top-2 right-2 space-y-2">
                    <button
                      className="text-gray-500 hover:text-gray-700 mr-2"
                      onClick={() => handleEdit(index)}
                    >
                      <i className="fas fa-pencil-alt text-xl"></i>
                    </button>
                    <button
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(index)}
                    >
                      <i className="fas fa-trash-alt text-xl"></i>
                    </button>
                  </div>

                  {coffee.image && (
                    <img
                      src={coffee.image}
                      alt="Coffee"
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                  )}
                  <div className="flex-1">
                    <p><strong>Location:</strong> {coffee.location}</p>
                    <p><strong>Temperature:</strong> {coffee.temperature}</p>
                    <p><strong>Date:</strong> {coffee.date}</p>
                    <p><strong>Average Rating:</strong> {coffee.averageRating}/5</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default AddCoffee;
