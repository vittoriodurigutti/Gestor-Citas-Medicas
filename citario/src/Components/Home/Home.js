import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    setUser(data);
  };

  const handleEmailChange = async (newEmail) => {
    const response = await fetch('/api/change-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, newEmail })
    });
    const data = await response.json();
    setUser(data);
  };

  const goToNuevoTurno = () => {
    navigate('/nuevoTurno');
  };

  return (
    <section className='Home'>
      {user ? (
        <>
          <h2>Bienvenido a su página de perfil, {user.nombre}</h2>
          <div>
            <h3>Perfil del Usuario</h3>
            <p>Nombre: {user.nombre}</p>
            <p>Apellido: {user.apellido}</p>
            <p>Email: {user.email} <button onClick={() => handleEmailChange('nuevoEmail@example.com')}>Cambiar Email</button></p>
            <p>DNI: {user.dni}</p>
          </div>
          <div>
            <h3>Mis Turnos</h3>
            {user.turnos.map(turno => (
              <div key={turno.id}>
                <p>Especialización: {turno.especializacion}</p>
                <p>Nombre del Doctor: {turno.doctor}</p>
                <p>Fecha del Turno: {turno.fecha}</p>
                <p>{new Date(turno.fecha) > new Date() ? 'Pendiente' : 'Cumplido'}</p>
              </div>
            ))}
          </div>
          <button onClick={goToNuevoTurno}>Pedir Nuevo Turno</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Usuario:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            Contraseña:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <input type="submit" value="Iniciar Sesión" />
        </form>
      )}
    </section>
  );
};

export default Home;
