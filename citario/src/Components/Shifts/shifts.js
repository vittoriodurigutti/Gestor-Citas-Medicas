import React, { useState } from 'react';
import './shifts.css';

const DoctorPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [doctorData, setDoctorData] = useState(null);
    const [startDateVacation, setStartDateVacation] = useState('');
    const [startDateAbsence, setStartDateAbsence] = useState('');
    const [endDateVacation, setEndDateVacation] = useState('');
    const [reasonVacation, setReasonVacation] = useState('');
    const [reasonAbsence, setReasonAbsence] = useState('');
    const [observationVacation, setObservationVacation] = useState('');
    const [observationAbsence, setObservationAbsence] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);

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
        if (!startDateVacation || !endDateVacation) {
            alert('Por favor, selecciona las fechas de inicio y fin.');
            return;
        }
        if (reasonVacation.length < 5) {
            alert('El motivo debe tener al menos 5 caracteres.');
            return;
        }
        if (observationVacation.length < 10) {
            alert('Las observaciones deben tener al menos 10 caracteres.');
            return;
        }

        const payload = {
            doctor: doctorData._id,
            daysOff: [startDateVacation, endDateVacation],
            reasonVacation,
            observationVacation,
        };

        console.log('Datos enviados:', payload); 

        try {
            const response = await fetch('https://citas-medicas-api.onrender.com/daysoff', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
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
        if (!startDateAbsence) {
            alert('Por favor, selecciona una fecha.');
            return;
        }
        if (timeSlots.length === 0) {
            alert('Por favor, selecciona al menos un horario.');
            return;
        }
        if (reasonAbsence.length < 5) {
            alert('El motivo debe tener al menos 5 caracteres.');
            return;
        }
        if (observationAbsence.length < 10) {
            alert('Las observaciones deben tener al menos 10 caracteres.');
            return;
        }

        const payload = {
            doctor: doctorData._id,
            appointmentsOff: [{
                date: startDateAbsence,
                timeSlots: timeSlots
            }],
            reasonAbsence,
            observationAbsence,
        };

        console.log('Datos enviados:', payload);

        try {
            const response = await fetch('https://citas-medicas-api.onrender.com/daysoff', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
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
            <input type="date" value={startDateVacation} onChange={e => setStartDateVacation(e.target.value)} placeholder="Fecha de inicio" />
            <input type="date" value={endDateVacation} onChange={e => setEndDateVacation(e.target.value)} placeholder="Fecha de fin" />
            <input type="text" value={reasonVacation} onChange={e => setReasonVacation(e.target.value)} placeholder="Motivo" maxLength="20" />
            <textarea value={observationVacation} onChange={e => setObservationVacation(e.target.value)} placeholder="Observaciones" maxLength="200" />
            <button onClick={handleDaysOffSubmit}>Enviar</button>
            <h2>Cargar Ausencia en Turno de Trabajo</h2>
            <input type="date" value={startDateAbsence} onChange={e => setStartDateAbsence(e.target.value)} placeholder="Fecha" />
            <select multiple value={timeSlots} onChange={e => setTimeSlots(Array.from(e.target.selectedOptions, option => option.value))}>
                {doctorData.workSchedule.map((timeSlot, index) => (
                    <option key={index} value={timeSlot}>{timeSlot}</option>
                ))}
            </select>
            <input type="text" value={reasonAbsence} onChange={e => setReasonAbsence(e.target.value)} placeholder="Motivo" maxLength="20" />
            <textarea value={observationAbsence} onChange={e => setObservationAbsence(e.target.value)} placeholder="Observaciones" maxLength="200" />
            <button onClick={handleAbsenceSubmit}>Enviar</button>
        </div>
    );
};

export default DoctorPage;
