// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Main'; // Mude aqui para usar o Main
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);
