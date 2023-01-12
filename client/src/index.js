import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { JournalsContextProvider } from './context/JournalContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <JournalsContextProvider>
        <App />
    </JournalsContextProvider>
  </AuthContextProvider>
  </React.StrictMode>
);


