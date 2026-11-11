import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { WebsiteProvider } from './context/WebsiteContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WebsiteProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </WebsiteProvider>
    </BrowserRouter>
  </React.StrictMode>
);

