import React from 'react';
import { FaTwitter, FaLinkedin, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl relative">
        <button
          onClick={() => navigate('/home')}
          className="absolute top-4 left-4 text-lg text-gray-700 hover:text-gray-900"
        >
          &#8592; {/* Código HTML para a seta para a esquerda */}
        </button>
        <h1 className="text-4xl font-bold text-dark-brown mb-6 text-center">Contact Us</h1>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-dark-brown">Brew & Beans カフェ</h2>
          <p className="text-lg text-gray-600 mt-2">We'd love to hear from you!</p>
        </div>
        <div className="flex flex-col items-center mb-8">
          <h3 className="text-xl font-semibold text-dark-brown mb-4">Follow Us</h3>
          <div className="flex space-x-6">
            <a href="https://twitter.com/yourbrand" target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-500 hover:text-blue-700">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com/company/yourbrand" target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-700 hover:text-blue-900">
              <FaLinkedin />
            </a>
            <a href="https://facebook.com/yourbrand" target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-600 hover:text-blue-800">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com/yourbrand" target="_blank" rel="noopener noreferrer" className="text-2xl text-pink-500 hover:text-pink-700">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg text-gray-600">For any inquiries, please email us at:</p>
          <a href="mailto:contact@brewbeans.com" className="text-blue-600 hover:underline">
            contact@brewbeans.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
