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
    const fetchAppointments = async () => {
      try {
        const response = await fetch('https://citas-medicas-api.onrender.com/appointment', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://citas-medicas-api.onrender.com/patient', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const user = data.find(user => user.email === email && user.password === password);
      if (user) {
        setUser({
          name: user.name,
          last_name: user.last_name,
          email: user.email,
        });
      } else {
        console.log('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
            <p>Email: {user.email} </p>
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
        <form onSubmit={handleLogin}>
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
