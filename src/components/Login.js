import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/home');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home'); // Redireciona para a Home após login
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg w-full max-w-md transition-all duration-500 transform hover:scale-105 relative">
        {/* Botão de Retorno */}
        <button
          onClick={() => navigate('/home')}
          className="absolute top-4 left-4 text-gray-700 hover:text-gray-900 focus:outline-none flex items-center"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>

        {/* Título e Subtítulo */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-dark-brown">Brew & Beans</h2>
          <p className="text-2xl font-bold text-red-600">カフェ</p>
        </div>

        {/* Título do Formulário */}
        <h3 className="text-xl font-semibold text-gray-600 mt-2 mb-4 text-center">Login</h3>
        
        {/* Mensagem de Erro */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-4">
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
          <div className="mb-6">
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
          <button
            type="submit"
            className="w-full bg-dark-brown hover:bg-brown text-white font-bold py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-dark-brown focus:ring-opacity-50"
          >
            Login
          </button>
        </form>

        {/* Link de Registro */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <button
            onClick={() => navigate('/register')}
            className="text-green-600 font-semibold hover:underline focus:outline-none"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
