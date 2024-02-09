import React, { useState, useEffect, useContext } from 'react';
import ContextoPaciente from '../ContextoPaciente';


const NuevoTurno = ({  }) => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const { patientId } = useContext(ContextoPaciente);


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('https://citas-medicas-api.onrender.com/doctor');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await fetch('https://citas-medicas-api.onrender.com/appointment');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchDoctors();
    fetchAppointments();
  }, []);

  
  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
  };

  const handleDayChange = (index) => {
    setSelectedDay(index);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleAppointmentCreate = async () => {
    try {
      const date = new Date(Date.now() + selectedDay * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const response = await fetch('https://citas-medicas-api.onrender.com/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date,
          time: selectedTime,
          doctor: selectedDoctor,
          patient: patientId,
        }),
      });
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('Error details:', errorDetails);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Appointment created successfully');
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const selectedDoctorDetails = doctors.find(doctor => doctor._id === selectedDoctor);
  const availableWorkSchedule = selectedDoctorDetails?.workSchedule.filter(time => {
    const dateTime = new Date(Date.now() + selectedDay * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T' + time + ':00.000Z';
    return !appointments.some(appointment => appointment.doctor._id === selectedDoctor && appointment.dateTime === dateTime);
  });

  return (
    <div>
      <select onChange={handleDoctorChange}>
        <option>Seleccione doctor</option>
        {doctors.map(doctor => (
          <option key={doctor._id} value={doctor._id}>{doctor.name} {doctor.last_name}</option>
        ))}
      </select>

      {selectedDoctorDetails && (
        <div>
          {Array.from({ length: 7 }, (_, index) => (
            <button key={index} onClick={() => handleDayChange(index)}>
              {new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </button>
          ))}
          <ul>
            {availableWorkSchedule?.map((time, index) => (
              <li key={index} onClick={() => handleTimeSelect(time)} style={{ backgroundColor: selectedTime === time ? 'lightgray' : 'white' }}>
                {time}
              </li>
            ))}
          </ul>
          {selectedTime && (
            <button onClick={handleAppointmentCreate}>Crear cita</button>
          )}
        </div>
      )}
    </div>
  );
};

export default NuevoTurno;
