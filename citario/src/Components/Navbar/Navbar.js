import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBars } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='Navbar'>
      <button onClick={toggleMenu} className={isOpen ? 'open' : ''}><FaBars /></button>
      <ul className={isOpen ? 'open' : ''}>
        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/historial" onClick={toggleMenu}>Historial de Turnos</Link></li>
        <li><Link to="/nuevoTurno" onClick={toggleMenu}>Solicite su Turno</Link></li>
        <li><Link to="/perfilDoctores" onClick={toggleMenu}>Sitio para Personal</Link></li>
        <li style={{ marginLeft: 'auto' }}><Link to="/login"><FaUser /> Iniciar Sesión</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
