import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './Components/Authentication/Auth/AuthContext'; // Correct import syntax

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider> {/* Correctly use AuthProvider as a named import */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
