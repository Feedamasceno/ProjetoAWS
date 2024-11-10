// Main.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import App from './App';
import AddCar from './AddCar';
import EditCar from './EditCar';

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/add" element={<AddCar />} />
                <Route path="/edit/:carId" element={<EditCar />} />
            </Routes>
        </Router>
    );
}

export default Main;
