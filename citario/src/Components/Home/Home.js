import React from 'react';

const Home = ({ clienteData, turnosPorCumplirse, goToHistorial, goToNuevoTurno }) => {
  
  return (
    <section>
      <h2>Bienvenido, {clienteData.nombre}</h2>

      <div>
        <h3>Datos del Cliente</h3>
      </div>

      <div>
        <h3>Turnos por Cumplirse</h3>
      </div>

      <button onClick={goToHistorial}>Historial de Turnos</button>
      <button onClick={goToNuevoTurno}>Pedir Nuevo Turno</button>

    </section>
  );
};

export default Home;