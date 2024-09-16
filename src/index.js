import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Certifique-se de que o arquivo está correto
import App from './App'; // Certifique-se de que a importação está correta
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
