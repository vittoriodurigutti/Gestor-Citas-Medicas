import React, { useState } from 'react';
import './SingIn.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Nombre de usuario:', username);
    console.log('Contraseña:', password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('https://citas-medicas-api.onrender.com/doctor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: firstName,
        last_name: lastName,
        email: email,
        dni: dni,
        password: password
      })
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <section className="SignIn">
      <form id="login-form" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        <label>
          Nombre de usuario:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu nombre de usuario"
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
        </label>
        <br />
        <button type="submit">Iniciar Sesión</button>
      </form>

      <form id="register-form" onSubmit={handleRegister}>
        <h2>Registrarme</h2>
        <label>
          Nombre:
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
          Apellido:
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
          Email:
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
          DNI:
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
          Contraseña:
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
        <button type="submit">Registrarme</button>
      </form>
    </section>
  );
};

export default SignIn;
