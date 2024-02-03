import React, { useState } from 'react';
import axios from 'axios';
import './SignIn.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [loginError, setLoginError] = useState('');
    const [registerError, setRegisterError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://citas-medicas-api.onrender.com/patient?email=${email}&password=${password}`);
            console.log('Datos del paciente:', response.data);
            setLoginError('');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setLoginError('No se encuentra usuario registrado bajo la casilla indicada');
            } else if (error.response && error.response.status === 401) {
                setLoginError('Contraseña incorrecta');
            } else {
                setLoginError('Error desconocido');
            }
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://citas-medicas-api.onrender.com/doctor', {
                name: firstName,
                last_name: lastName,
                email: email,
                dni: dni,
                password: password
            });
            console.log(response.data);
            setRegisterError('');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setRegisterError('El usuario que intenta registrar ya existe');
            } else {
                setRegisterError('Error desconocido');
            }
        }
    };

    return (
        <section className="SignIn">
            <form id="login-form" onSubmit={handleLogin}>
                <h2>Iniciar Sesión</h2>
                <label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresa tu correo electrónico"
                    />
                </label>
                <br />
                <label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                    />
                </label>
                <br />
                {loginError && <p className="error">{loginError}</p>}
                <button type="submit">Iniciar Sesión</button>
            </form>

            <form id="register-form" onSubmit={handleRegister}>
                <h2>Registrarme</h2>
                <label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        pattern="[A-Za-z]+"
                        maxLength="20"
                        required
                        placeholder="Ingresa tu nombre"
                    />
                </label>
                <br />
                <label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        pattern="[A-Za-z]+"
                        maxLength="20"
                        required
                        placeholder="Ingresa tu apellido"
                    />
                </label>
                <br />
                <label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Ingresa tu email"
                    />
                </label>
                <br />
                <label>
                    <input
                        type="text"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        pattern="[0-9]{1,8}"
                        required
                        placeholder="Ingresa tu DNI"
                    />
                </label>
                <br />
                <label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}"
                        required
                        placeholder="Ingresa tu contraseña"
                    />
                </label>
                <br />
                {registerError && <p className="error">{registerError}</p>}
                <button type="submit">Registrarme</button>
            </form>
        </section>
    );
};

export default SignIn;
