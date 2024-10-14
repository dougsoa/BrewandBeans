import React from 'react';
import { FaCoffee } from 'react-icons/fa'; // Importar ícone de café

function About() {
  return (
    <div className="about-container min-h-screen p-6 bg-gradient-to-r from-[#fffbf0] to-[#f0eae3]">
      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card da esquerda */}
        <div className="bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
          <h1 className="text-4xl font-bold mb-4 text-dark-brown">About Brew & Beans</h1>
          <p className="text-lg mb-4">
            Brew & Beans is your new best friend in the world of <strong className="font-semibold">coffee</strong>! 
            Record your adventures with new or old favorite <strong className="font-semibold">coffees</strong>, and save those recipes you just discovered.
          </p>
          <p className="text-lg mb-4">
            With us, every cup is a new surprise and every recipe is a chapter in your personal journey through the <strong className="font-semibold">coffee</strong> universe. 
            <FaCoffee className="inline text-brown-500" /> 
          </p>
        </div>

        {/* Card da direita */}
        <div className="bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
          <h2 className="text-4xl font-bold mb-4 text-dark-brown">Why Use Brew & Beans?</h2>
          <p className="text-lg mb-4">
            At Brew & Beans, you can rate your <strong className="font-semibold">coffees</strong>, save recipes, and record your <strong className="font-semibold">coffee</strong> adventures. 
            Keep a diary of your epic <strong className="font-semibold">coffees</strong> and discover new flavors, all with a super-friendly interface.
          </p>
          <p className="text-lg mb-4">
            Turn each cup into a new journey and every recipe into a new story in the <strong className="font-semibold">coffee</strong> universe. ☕✨
          </p>
        </div>

        {/* Card da esquerda (segunda parte) */}
        <div className="bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
          <h2 className="text-4xl font-bold mb-4 text-dark-brown">Our Story</h2>
          <p className="text-lg mb-4">
            Brew & Beans was born from the passion of a <strong className="font-semibold">coffee</strong> lover. Determined to share this passion, they created a platform to help other enthusiasts and appreciators record their adventures in the world of <strong className="font-semibold">coffee</strong>.
          </p>
          <p className="text-lg mb-4">
            We believe everyone has a unique relationship with <strong className="font-semibold">coffee</strong> and that every prepared cup is an opportunity to create something special. 
            The idea behind the platform is to inspire users to explore, experiment, and record their own creations.
          </p>
        </div>

        {/* Card da direita (segunda parte) */}
        <div className="bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
          <h2 className="text-4xl font-bold mb-4 text-dark-brown">Our Mission</h2>
          <p className="text-lg mb-4">
            Our mission is to make <strong className="font-semibold">coffee</strong> more accessible and fun, from the newbie who thinks "espresso" is a place to the expert who knows every bean. 
            We provide tools to explore flavors, experiment with methods, and keep track of your adventures like they're precious secrets.
          </p>
          <p className="text-lg mb-4">
            At Brew & Beans, every sip is a new discovery. We're here to make your <strong className="font-semibold">coffee</strong> journey as enjoyable as a hot or iced cup 👀!
          </p>
        </div>
      </section>

      <footer className="text-center mt-8 text-lg text-dark-brown">
        <p>We mentioned the word <strong className="font-semibold">coffee</strong> 13 times — maybe it's superstition or just the number of cups you drink in a day. ☕️😉</p>
      </footer>
    </div>
  );
}

export default About;
