import React, { useState, useEffect } from 'react';

const CoffeeForm = ({ onSubmit, coffeeData, isEditing, onCancel }) => {
  const [image, setImage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    temperature: 'hot', // Default value
    bitterness: 0,
    aroma: 0,
    acidity: 0,
    body: 0,
    sweetness: 0,
    notes: '',
    date: '',
  });

  useEffect(() => {
    if (isEditing && coffeeData) {
      setFormData(coffeeData);
      setImage(coffeeData.image);
    } else {
      resetForm();
    }
  }, [isEditing, coffeeData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 5) {
      setFormData({ ...formData, [name]: numValue });
    }
  };

  const calculateAverageRating = () => {
    const { aroma, acidity, body, sweetness } = formData;
    const total = parseInt(aroma) + parseInt(acidity) + parseInt(body) + parseInt(sweetness);
    const average = total / 4;
    return isNaN(average) ? 0 : average.toFixed(1); // Return average rating, default to 0 if NaN
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const averageRating = calculateAverageRating();
    onSubmit({ ...formData, image, averageRating });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      temperature: 'hot', // Reset to default
      bitterness: 0,
      aroma: 0,
      acidity: 0,
      body: 0,
      sweetness: 0,
      notes: '',
      date: '',
    });
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 mb-6">
      <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Coffee' : 'Add Coffee'}</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="name">
          Coffee Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter coffee name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-green-500 transition"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="location">
          Location <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Enter coffee location"
          value={formData.location}
          onChange={handleInputChange}
          required
          className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-green-500 transition"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="temperature">
          Temperature
        </label>
        <select
          name="temperature"
          id="temperature"
          value={formData.temperature}
          onChange={handleInputChange}
          className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-green-500 transition"
        >
          <option value="hot">Hot</option>
          <option value="cold">Cold</option>
        </select>
      </div>
      {/* Ratings Section */}
      {['aroma', 'body', 'acidity', 'sweetness'].map((criteria) => (
        <div className="mb-4" key={criteria}>
          <label className="block text-sm font-medium mb-2" htmlFor={criteria}>
            {criteria.charAt(0).toUpperCase() + criteria.slice(1)} (0-5)
          </label>
          <input
            type="number"
            name={criteria}
            id={criteria}
            value={formData[criteria]}
            onChange={handleNumberChange}
            min="0"
            max="5"
            required
            className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-green-500 transition"
          />
        </div>
      ))}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="date">
          Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date}
          onChange={handleInputChange}
          required
          className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-green-500 transition"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="notes">
          Notes
        </label>
        <textarea
          name="notes"
          id="notes"
          placeholder="Enter any additional notes"
          value={formData.notes}
          onChange={handleInputChange}
          className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-green-500 transition"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="image">
          Upload Image
        </label>
        <input
          type="file"
          onChange={handleImageChange}
          className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-green-500 transition"
        />
      </div>
      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition"
        >
          {isEditing ? 'Update' : 'Save'} Coffee
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-600 font-bold py-2 px-4 rounded hover:underline"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CoffeeForm;
