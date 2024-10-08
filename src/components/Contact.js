import React from 'react';
import { FaTwitter, FaLinkedin, FaFacebookF, FaInstagram } from 'react-icons/fa';

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#fffbf0] to-[#f0eae3] flex flex-col items-center justify-center py-10 px-4">
      {/* Card para o conteúdo principal */}
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full transition-transform transform hover:scale-105">
        <h1 className="text-4xl font-bold text-dark-brown text-center mb-6">Get in Touch</h1>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-dark-brown mb-2">Brew & Beans</h2>
          <p className="text-lg text-gray-600">We’re excited to connect with you!</p>
        </div>

        <form className="space-y-4">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brown"
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brown"
          />
          <textarea 
            placeholder="Your Message" 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brown h-32"
          />
          <button 
            type="submit" 
            className="w-full bg-brown text-white font-semibold py-2 rounded hover:bg-dark-brown transition-colors duration-300"
          >
            Send Message
          </button>
        </form>

        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-dark-brown mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-6">
            <a href="https://twitter.com/yourbrand" target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-500 hover:text-blue-700 transition-colors duration-300">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com/company/yourbrand" target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-700 hover:text-blue-900 transition-colors duration-300">
              <FaLinkedin />
            </a>
            <a href="https://facebook.com/yourbrand" target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-600 hover:text-blue-800 transition-colors duration-300">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com/yourbrand" target="_blank" rel="noopener noreferrer" className="text-2xl text-pink-500 hover:text-pink-700 transition-colors duration-300">
              <FaInstagram />
            </a>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">For any inquiries, please email us at:</p>
          <a href="mailto:contact@brewbeans.com" className="text-blue-600 hover:underline transition-colors duration-300">
            contact@brewbeans.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
