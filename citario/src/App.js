import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import Home from './Components/Home/Home.js';
import Navbar from './Components/Navbar/Navbar.js';
import SignIn from './Components/SignIn/SignIn.js';
import AppointmentHistory from './Components/AppointmentHistory/appointmentHistory.js';
import NuevoTurno from './Components/NuevoTurno/NuevoTurno.js';
import DoctorPage from './Components/Shifts/shifts.js';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <img src="https://www.shutterstock.com/image-photo/doctor-man-stethoscope-hospital-260nw-555894940.jpg" alt="Portada" />
          <Navbar />
        </header>
        <div className="container">
          <Routes className= "listContainer">
            <Route path="/login" element={<SignIn/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/historial" element={<AppointmentHistory/>} />
            <Route path="/nuevoTurno" element={<NuevoTurno/>} />
            <Route path="/perfilDoctores" element={<DoctorPage/>} />
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
