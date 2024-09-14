// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Certifique-se de que esses caminhos estão corretos
  ],
  theme: {
    extend: {
      colors: {
        'light-brown': '#f5f5dc',
        'dark-brown': '#4a3b2a',
        'brown': '#8b5e3c',
      },
    },
  },
  plugins: [],
};
