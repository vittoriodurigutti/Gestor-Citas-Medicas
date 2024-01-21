import React, { useState } from 'react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('login');
  const navigateTo = (section) => {
    setActiveSection(section);
  }

  return (
    <nav>
      <ul>
      <ul>
          <li onClick={() => navigateTo('login')}>Iniciar Sesión</li>
          <li onClick={() => navigateTo('home')}>Home</li>
          <li onClick={() => navigateTo('historial')}>Historial de Turnos</li>
          <li onClick={() => navigateTo('nuevoTurno')}>Pedir Nuevo Turno</li>
        </ul>
      </ul>
    </nav>
  );
};

export default Navbar;