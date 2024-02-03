import React, { useState, useEffect } from 'react';
import './appointmentHistory.css';


const AppointmentHistory = () => {
 
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {

    const getAppointment = async () => {
      try {

        const response = await fetch('enpoint');
        const data = await response.json();

        setTurnos(data);
      } catch (error) {
        console.error('Error al obtener los turnos', error);
      }
    };

    getAppointment();
  }, []); 

  return (
    <section className="appointmentHistory">
      <h2>Historial de Turnos</h2>
      <ul>
        {turnos.map((turno) => (
          <li key={turno.id}>
            <strong>Fecha:</strong> {turno.fecha} - <strong>Hora:</strong> {turno.hora}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AppointmentHistory;