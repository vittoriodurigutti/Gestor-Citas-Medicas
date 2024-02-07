import React, { useState, useEffect } from 'react';

const NuevoTurno = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

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

    fetchDoctors();
  }, []);

  const handleSpecializationChange = (e) => {
    setSelectedSpecialization(e.target.value);
    setSelectedDoctor(null);
  };

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
  };

  const specializations = [...new Set(doctors.map(doctor => doctor.specialization.name))];
  const doctorsBySpecialization = doctors.filter(doctor => doctor.specialization.name === selectedSpecialization);
  const selectedDoctorDetails = doctors.find(doctor => doctor._id === selectedDoctor);

  return (
    <div>
      <select onChange={handleSpecializationChange}>
        <option>Seleccione servicio</option>
        {specializations.map((specialization, index) => (
          <option key={index} value={specialization}>{specialization}</option>
        ))}
      </select>

      {selectedSpecialization && (
        <select onChange={handleDoctorChange}>
          <option>Seleccione doctor</option>
          {doctorsBySpecialization.map(doctor => (
            <option key={doctor._id} value={doctor._id}>{doctor.name} {doctor.last_name} ({doctor.startTime}-{doctor.endTime})</option>
          ))}
        </select>
      )}

      {selectedDoctorDetails && (
        <ul>
          {selectedDoctorDetails.workSchedule.map((time, index) => (
            <li key={index}>{time}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NuevoTurno;
