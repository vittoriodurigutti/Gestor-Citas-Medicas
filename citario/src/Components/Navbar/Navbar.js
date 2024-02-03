import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className='Navbar'>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/historial">Historial de Turnos</Link></li>
        <li><Link to="/nuevoTurno">Solicite su Turno</Link></li>
        <li><Link to="/perfilDoctores">Sitio para Personal</Link></li>
        <li style={{ marginLeft: 'auto' }}><Link to="/login"><FaUser /> Iniciar Sesión</Link></li> {/* Mueve el botón de inicio de sesión al extremo derecho y agrega un icono de usuario */}
      </ul>
    </nav>
  );
};

export default Navbar;