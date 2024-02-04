import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('https://citas-medicas-api.onrender.com/patient', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setUser(data);
    };

    const fetchAppointments = async () => {
      const response = await fetch('https://citas-medicas-api.onrender.com/appointment', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setAppointments(data);
    };

    fetchUser();
    fetchAppointments();
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    setUser(data);
  };

  const handleEmailChange = async (newEmail) => {
    const response = await fetch('/api/change-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newEmail })
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
          <h2>Bienvenido a su página de perfil, {user.name} {user.last_name}</h2>
          <div>
            <h3>Perfil del Usuario</h3>
            <p>Nombre: {user.name}</p>
            <p>Apellido: {user.last_name}</p>
            <p>Email: {user.email} <button onClick={() => handleEmailChange('nuevoEmail@example.com')}>Cambiar Email</button></p>
            <p>DNI: {user.dni}</p>
          </div>
          <div>
            <h3>Mis Turnos</h3>
            {appointments.filter(appointment => appointment.patient._id === user._id).map(turno => (
              <div key={turno._id}>
                <p>Especialización: {turno.specialization.name}</p>
                <p>Nombre del Doctor: {turno.doctor.name} {turno.doctor.last_name}</p>
                <p>Fecha del Turno: {turno.dateTime}</p>
                <p>Estado: {turno.status}</p>
              </div>
            ))}
          </div>
          <button onClick={goToNuevoTurno}>Pedir Nuevo Turno</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Correo electrónico:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
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

