import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importa el archivo CSS

const Navbar = () => {
  return (
    <nav className='Navbar'>
      <ul>
        <li><Link to="/login">Iniciar Sesión</Link></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/historial">Historial de Turnos</Link></li>
        <li><Link to="/nuevoTurno">Pedir Nuevo Turno</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;