import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContactContextProvider } from './context/ContactContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContactContextProvider>
    <App />
  </ContactContextProvider>
  
);

