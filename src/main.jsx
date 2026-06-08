import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { NameProvider } from './context/NameContext';
import { AnswersProvider } from './context/AnswersContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NameProvider>
      <AnswersProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AnswersProvider>
    </NameProvider>
  </React.StrictMode>,
);
