import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import App from './App';
import { AuthProvider } from './Authentication/Auth/AuthContext'; // Assuming correct import syntax

// Use createRoot to create a root.
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider> 
      <App />
    </AuthProvider>
  </React.StrictMode>
);
