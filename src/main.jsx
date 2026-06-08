import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { NameProvider } from './context/NameContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NameProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NameProvider>
  </React.StrictMode>,
);
