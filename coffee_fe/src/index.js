import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RouterCustom from './router'; // Assuming RouterCustom is your custom router component
import './index.css'; // Import the CSS reset

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <RouterCustom />
  </BrowserRouter>
);
