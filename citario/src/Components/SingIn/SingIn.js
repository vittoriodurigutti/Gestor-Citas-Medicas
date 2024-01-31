import React, { useState } from 'react';
import './SingIn.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [specialty, setSpecialty] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Nombre de usuario:', username);
    console.log('Contraseña:', password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Nombre:', firstName);
    console.log('Apellido:', lastName);
    console.log('DNI:', dni);
    console.log('Especialidad:', specialty);
  };

  return (
    <section className="SignIn">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <label>
          Nombre de usuario:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Iniciar Sesión</button>
      </form>

      <h2>Registrarme</h2>
      <form onSubmit={handleRegister}>
        <label>
          Nombre:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            pattern="[A-Za-z]+"
            maxLength="20"
            required
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
          />
        </label>
        <br />
        <label>
          DNI:
          <input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            pattern="[0-9]+"
            maxLength="8"
            required
          />
        </label>
        <br />
        <label>
          Especialidad:
          <input
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Registrarme</button>
      </form>
    </section>
  );
};

export default SignIn;
