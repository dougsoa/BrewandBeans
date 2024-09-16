// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-brown': '#f5f5dc',
        'dark-brown': '#4a3b2a',
        'brown': '#8b5e3c',
        'gray-600': '#4a4a4a',
        'off-white': '#f9f9f9', // Off-white adicionado
      },
    },
  },
  plugins: [],
};
