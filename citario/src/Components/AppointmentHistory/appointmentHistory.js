import React, { useState, useEffect, useContext } from 'react';
import ContextoPaciente from '../ContextoPaciente';
import './appointmentHistory.css';

const AppointmentHistory = () => {
  const { patientId } = useContext(ContextoPaciente);
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const getAppointment = async () => {
      try {
        const response = await fetch(`https://citas-medicas-api.onrender.com/appointment?patientId=${patientId}`);
        const data = await response.json();
        setTurnos(data);
      } catch (error) {
        console.error('Error al obtener los turnos', error);
      }
    };

    if (patientId) {
      getAppointment();
    }
  }, [patientId]); 

  return (
    <section className="appointmentHistory">
      <h2>Historial de Turnos</h2>
      <ul>
        {turnos.map((turno) => (
          <li key={turno._id}>
            <strong>Fecha:</strong> {turno.date} - <strong>Hora:</strong> {turno.dateTime}
            <strong>Doctor:</strong> {turno.doctor.name} {turno.doctor.last_name}
            <strong>Especialización:</strong> {turno.specialization}
            <strong>Estado:</strong> {turno.status}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AppointmentHistory;
