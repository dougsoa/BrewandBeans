import React from 'react';
import { FaTwitter, FaLinkedin, FaFacebookF, FaInstagram } from 'react-icons/fa';

function Contact() {
  return (
    <div className="min-h-screen bg-off-white flex flex-col items-center justify-between py-8">
      {/* Card para o conteúdo principal */}
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-5xl font-bold text-dark-brown mb-6 text-center">Get in Touch</h1>
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-dark-brown mb-2">Brew & Beans カフェ</h2>
          <p className="text-lg text-gray-600">We’d love to hear from you. Reach out to us through any of the channels below!</p>
        </div>

        <div className="flex flex-col items-center mb-10">
          <h3 className="text-2xl font-semibold text-dark-brown mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-6">
            <a href="https://twitter.com/yourbrand" target="_blank" rel="noopener noreferrer" className="text-3xl text-blue-500 hover:text-blue-700 transition-colors duration-300">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com/company/yourbrand" target="_blank" rel="noopener noreferrer" className="text-3xl text-blue-700 hover:text-blue-900 transition-colors duration-300">
              <FaLinkedin />
            </a>
            <a href="https://facebook.com/yourbrand" target="_blank" rel="noopener noreferrer" className="text-3xl text-blue-600 hover:text-blue-800 transition-colors duration-300">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com/yourbrand" target="_blank" rel="noopener noreferrer" className="text-3xl text-pink-500 hover:text-pink-700 transition-colors duration-300">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">For any inquiries, please email us at:</p>
          <a href="mailto:contact@brewbeans.com" className="text-blue-600 text-lg hover:underline transition-colors duration-300">
            contact@brewbeans.com
          </a>
        </div>
      </div>

      {/* Footer fixo */}
      <footer className="bg-dark-brown w-full py-4 text-center text-white mt-10">
        <p className="text-sm">&copy; 2024 Brew & Beans. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Contact;
