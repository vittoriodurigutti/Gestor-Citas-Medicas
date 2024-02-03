import React, { useState } from 'react';
import axios from 'axios';

const DoctorPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [doctorData, setDoctorData] = useState(null);
    const [daysOffInput, setDaysOffInput] = useState('');
    const [reason, setReason] = useState('');
    const [observation, setObservation] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://citas-medicas-api.onrender.com/doctor', { email, password });
            setDoctorData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDaysOffSubmit = async () => {
        const daysOff = daysOffInput.split(',').map(date => date.trim());
        try {
            const response = await axios.post('https://citas-medicas-api.onrender.com/daysoff', {
                doctor: doctorData._id,
                daysOff,
                reason,
                observation,
                appointmentsOff: [],
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!doctorData) {
        return (
            <div>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                <button onClick={handleLogin}>Login</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Welcome, Dr. {doctorData.name} {doctorData.last_name}</h1>
            <p>Specialization: {doctorData.specialization.name}</p>
            <p>Work Schedule: {doctorData.workSchedule.join(', ')}</p>
            <h2>Días libres</h2>
            <input type="text" value={daysOffInput} onChange={e => setDaysOffInput(e.target.value)} placeholder="Ingrese las fechas separadas por comas" />
            <input type="text" value={reason} onChange={e => setReason(e.target.value)} placeholder="Motivo" />
            <textarea value={observation} onChange={e => setObservation(e.target.value)} placeholder="Observaciones" />
            <button onClick={handleDaysOffSubmit}>Guardar días libres</button>
        </div>
    );
};

export default DoctorPage;


