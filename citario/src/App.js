import React from 'react';
import {BrowserRouter as Router,Routes,Route, Redirect,Navigate} from "react-router-dom";
import './App.css';
import Home from './Components/Home/Home.js';
import Navbar from './Components/Navbar/Navbar.js';
import Login from './Components/Login/Login.js';
import HistorialTurnos from './Components/HistorialTurnos/HistorialTurnos.js';
import NuevoTurno from './Components/NuevoTurno/NuevoTurno.js';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <img src="url_de_la_imagen" alt="Portada" />
          <Navbar />
        </header>
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/historial-turnos" element={<HistorialTurnos/>} />
            <Route path="/nuevo-turno" element={<NuevoTurno/>} />
            <Route path="/home" element={<Home/>} />
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
