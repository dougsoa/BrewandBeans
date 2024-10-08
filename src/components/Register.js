import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg w-full max-w-md transition-all duration-500 transform hover:scale-105 relative">

        {/* Título e Subtítulo */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-dark-brown">Brew & Beans</h2>
          <p className="text-2xl font-bold text-red-600">カフェ</p>
        </div>

        {/* Título do Formulário */}
        <h3 className="text-xl font-semibold text-gray-600 mt-2 mb-4 text-center">Register</h3>
        
        {/* Mensagem de Erro */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        {/* Formulário */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="mb-4">
            <label
              className="block text-dark-brown text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-dark-brown"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-dark-brown text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-dark-brown"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-dark-brown text-sm font-semibold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-dark-brown"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-dark-brown hover:bg-brown text-white font-bold py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-dark-brown focus:ring-opacity-50"
          >
            Register
          </button>
        </form>

        {/* Link para Login */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <button
            onClick={() => navigate('/login')}
            className="text-green-600 font-semibold hover:underline focus:outline-none"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
