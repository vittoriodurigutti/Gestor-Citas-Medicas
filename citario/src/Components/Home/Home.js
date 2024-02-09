import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextoPaciente from '../ContextoPaciente';

import './Home.css';

const Home = () => {
  const { patientId } = useContext(ContextoPaciente);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!patientId) {
      navigate('/login');
    } else {
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
    }
  }, [patientId, navigate]);

  const goToNuevoTurno = () => {
    navigate('/nuevoTurno');
  };

  return (
    <section className='Home'>
      {patientId && (
        <>
          <h2>Bienvenido a su página de perfil</h2>
          <div>
            <h3>Mis Turnos</h3>
            {appointments.filter(appointment => appointment.patient._id === patientId).length > 0 ? (
              appointments.filter(appointment => appointment.patient._id === patientId).map(turno => (
                <div key={turno._id}>
                  <p>Especialización: {turno.specialization.name}</p>
                  <p>Nombre del Doctor: {turno.doctor.name} {turno.doctor.last_name}</p>
                  <p>Fecha del Turno: {turno.dateTime}</p>
                  <p>Estado: {turno.status}</p>
                </div>
              ))
            ) : (
              <p>De momento no hay citas registradas.</p>
            )}
          </div>
          <button onClick={goToNuevoTurno}>Pedir Nuevo Turno</button>
        </>
      )}
    </section>
  );
};

export default Home;
