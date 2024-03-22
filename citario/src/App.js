
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import Home from './Components/Home/Home.js';
import Navbar from './Components/Navbar/Navbar.js';
import SignIn from './Components/SignIn/SignIn.js';
import AppointmentHistory from './Components/AppointmentHistory/appointmentHistory.js';
import NuevoTurno from './Components/NuevoTurno/NuevoTurno.js';
import DoctorPage from './Components/Shifts/shifts.js';
import ContextoPaciente from './Components/ContextoPaciente.js';
import AddDoctor from './Components/addDoctor/addDoctor.js';

function App() {
  const [patientId, setPatientId] = useState(null);

  return (
    <ContextoPaciente.Provider value={{ patientId, setPatientId }}>
      <Router>
        <div className="App">
          <header className="header">
            <img src="https://wallpapercave.com/wp/wp3487933.jpg" alt="Portada" />
            <Navbar />
          </header>
          <div className="container">
            <Routes className= "listContainer">
              <Route path="/Login" element={<SignIn/>} />
              <Route path="/" element={<Home/>} />
              <Route path="/Historial" element={<AppointmentHistory/>} />
              <Route path="/Nuevo_Turno" element={<NuevoTurno/>} />
              <Route path="/Doctores" element={<DoctorPage/>} />
              <Route path= "/Sumar_Doctor" element={<AddDoctor/>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <footer className="footer">
            © 2024 Hospital XYZ. Todos los derechos reservados.
          </footer>
        </div>
      </Router>
    </ContextoPaciente.Provider>
  );
}

export default App;
