import React, { useState, useContext } from 'react';
import ContextoPaciente from '../ContextoPaciente';
import './SignIn.css';

const SignIn = () => {
    const { setPatientId } = useContext(ContextoPaciente);
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
          const response = await fetch(`https://citas-medicas-api.onrender.com/patient?email=${email}&password=${password}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const user = data.find(user => user.email === email && user.password === password);
          if (user) {
            console.log('ID del paciente:', user._id);
            setPatientId(user._id); 
            setLoginError('');
          } else {
            console.log('Usuario no encontrado');
            setLoginError('No se encuentra usuario registrado bajo la casilla indicada');
          }
        } catch (error) {
          console.error('Error desconocido:', error);
          setLoginError('Error desconocido');
        }
    };
        

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('https://citas-medicas-api.onrender.com/patient', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: firstName,
              last_name: lastName,
              email: email,
              password: password
            })
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
          setRegisterError('');
        } catch (error) {
          if (error.message.includes('409')) {
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
