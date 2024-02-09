import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ContextoPaciente from '../ContextoPaciente';

import './Navbar.css';

const Navbar = () => {
  const { patientId, setPatientId } = useContext(ContextoPaciente);
  const handleLogout = () => {setPatientId(null);}

  return (
    <nav className="Navbar">
      <Link to="/">Inicio</Link>
      {patientId ? (
        <>
          <Link to="/perfilDoctores">Doctores</Link>
          <Link to="/historial">Historial de Citas</Link>
          <Link to="/nuevoTurno">Nuevo Turno</Link>
          <span>{patientId.name} {patientId.last_name}</span>
          <button onClick={handleLogout}>Cerrar Sesión</button> 
        </>
      ) : (
        <Link to="/login">Iniciar Sesión</Link>
      )}
    </nav>
  );
};

export default Navbar;