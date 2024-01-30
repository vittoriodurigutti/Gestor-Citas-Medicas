import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import Home from './Components/Home/Home.js';
import Navbar from './Components/Navbar/Navbar.js';
import SingIn from './Components/SingIn/SingIn.js';
import HistorialTurnos from './Components/HistorialTurnos/HistorialTurnos.js';
import NuevoTurno from './Components/NuevoTurno/NuevoTurno.js';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <img src="https://www.shutterstock.com/image-photo/doctor-man-stethoscope-hospital-260nw-555894940.jpg" alt="Portada" />
          <Navbar />
        </header>
        <div className="container">
          <Routes className= "listaContainer">
            <Route path="/login" element={<SingIn/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/historial" element={<HistorialTurnos/>} />
            <Route path="/nuevoTurno" element={<NuevoTurno/>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <footer className="footer">
          © 2024 Hospital XYZ. Todos los derechos reservados.
        </footer>
      </div>
    </Router>
  );
}

export default App;
