import React, { useState } from 'react';
import './shifts.css';

const DoctorPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [doctorData, setDoctorData] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [observation, setObservation] = useState('');
    const [timeSlots, setTimeSlots] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch(`https://citas-medicas-api.onrender.com/doctor?email=${email}&password=${password}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const doctor = data.find(doctor => doctor.email === email && doctor.password === password);
            if (doctor) {
                console.log('ID del doctor:', doctor._id);
                setDoctorData(doctor);
            } else {
                console.log('Doctor no encontrado');
            }
        } catch (error) {
            console.error('Error desconocido:', error);
        }
    };

    const handleDaysOffSubmit = async () => {
        try {
            const response = await fetch('https://citas-medicas-api.onrender.com/daysoff', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doctor: doctorData._id,
                    daysOff: [startDate, endDate],
                    reason,
                    observation,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error desconocido:', error);
        }
    };

    const handleAbsenceSubmit = async () => {
        try {
            const response = await fetch('https://citas-medicas-api.onrender.com/daysoff', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doctor: doctorData._id,
                    appointmentsOff: [{
                        date: startDate,
                        timeSlots: timeSlots.split(',').map(time => time.trim()),
                    }],
                    reason,
                    observation,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error desconocido:', error);
        }
    };

    if (!doctorData) {
        return (
            <div className="DoctorPage">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                <button onClick={handleLogin}>Login</button>
            </div>
        );
    }

    return (
        <div className="DoctorPage">
            <h1>Bienvenido, Dr. {doctorData.name} {doctorData.last_name}</h1>
            <p>Especialidad: {doctorData.specialization.name}</p>
            <p>Esquema de Trabajo: {doctorData.workSchedule.join(', ')}</p>
            <h2>Cargar Vacaciones/Licencias</h2>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} placeholder="Fecha de inicio" />
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} placeholder="Fecha de fin" />
            <input type="text" value={reason} onChange={e => setReason(e.target.value)} placeholder="Motivo" maxLength="20" />
            <textarea value={observation} onChange={e => setObservation(e.target.value)} placeholder="Observaciones" maxLength="200" />
            <button onClick={handleDaysOffSubmit}>Enviar</button>
            <h2>Cargar Ausencia en Turno de Trabajo</h2>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} placeholder="Fecha" />
            <input type="text" value={timeSlots} onChange={e => setTimeSlots(e.target.value)} placeholder="Horarios, separados por comas" />
            <input type="text" value={reason} onChange={e => setReason(e.target.value)} placeholder="Motivo" maxLength="20" />
            <textarea value={observation} onChange={e => setObservation(e.target.value)} placeholder="Observaciones" maxLength="200" />
            <button onClick={handleAbsenceSubmit}>Enviar</button>
        </div>
    );
};

export default DoctorPage;
