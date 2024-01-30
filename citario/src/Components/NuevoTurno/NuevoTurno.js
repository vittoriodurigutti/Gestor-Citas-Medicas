import React, { useState, useEffect } from 'react';

const NuevoTurno = ({ history }) => {
  const especialidades = ["Especialidad1", "Especialidad2", "Especialidad3"];
  const profesionalesPorEspecialidad = {
    Especialidad1: ["Profesional1A", "Profesional1B"],
    Especialidad2: ["Profesional2A", "Profesional2B"],
    Especialidad3: ["Profesional3A", "Profesional3B"],
  };
  const horariosDisponibles = [
    { dia: "Lunes", mes: "Enero", año: 2024, horarios: ["8:00", "9:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
    { dia: "Martes", mes: "Enero", año: 2024, horarios: ["8:00", "9:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
    /*....*/ 
  ];

  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('');
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState('');
  const [fechasDisponibles, setFechasDisponibles] = useState([]);
  useEffect(() => {
    const cargarFechasDesdeEndpoint = async () => {
      try {
        const response = await fetch('enpoint');
        const data = await response.json();
        // Actualiza el estado con las fechas obtenidas desde el backend
        setFechasDisponibles(data);
      } catch (error) {
        console.error('Error al cargar fechas desde el backend', error);
      }
    };
    cargarFechasDesdeEndpoint();
  }, []); 
  const handleEspecialidadChange = (e) => {
    const especialidad = e.target.value;
    setEspecialidadSeleccionada(especialidad);
    setProfesionalSeleccionado(''); 
  };
  const handleProfesionalChange = (e) => {
    const profesional = e.target.value;
    setProfesionalSeleccionado(profesional);
    };
  const handleConfirmarTurno = () => {
    // Aca tengo que agregar la logica para completr el turno,
    // redirección después de 2 segundos
    setTimeout(() => {
      history.push('/historial-turnos');
    }, 2000);
  };
  const renderFechasDisponibles = () => {
    // Filtrar las fechas disponibles según la especialidad y el profesional seleccionados
    const fechasFiltradas = fechasDisponibles.filter(
      (fecha) => fecha.horarios.length > 0 && fecha.horarios.some((horario) => horario !== 'ocupado')
    );
    return (
      <div>
        <h4>Fechas Disponibles</h4>
        <ul>
          {fechasFiltradas.map((fecha, index) => (
            <li key={index}>
              {`${fecha.dia}, ${fecha.mes} ${fecha.año}: ${fecha.horarios.join(', ')}`}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <section>
      <h2>Pedir Nuevo Turno</h2>
      {/* Selección de especialidad */}
      <div>
        <label>Especialidad:</label>
        <select onChange={handleEspecialidadChange} value={especialidadSeleccionada}>
          <option value="">Seleccione una especialidad</option>
          {especialidades.map((especialidad, index) => (
            <option key={index} value={especialidad}>
              {especialidad}
            </option>
          ))}
        </select>
      </div>
      {/* Selección de profesional */}
      {especialidadSeleccionada && (
        <div>
          <label>Profesional:</label>
          <select onChange={handleProfesionalChange} value={profesionalSeleccionado}>
            <option value="">Seleccione un profesional</option>
            {profesionalesPorEspecialidad[especialidadSeleccionada].map((profesional, index) => (
              <option key={index} value={profesional}>
                {profesional}
              </option>
            ))}
          </select>
        </div>
      )}
      {/* Lista de fechas disponibles */}
      {profesionalSeleccionado && renderFechasDisponibles()}
      {/* Opción para recordatorio vía WhatsApp */}
      <div>
        <label>
          <input type="checkbox" id="chk-recordatorio-whatsapp" />
          Recordatorio vía WhatsApp
        </label>
      </div>
      {/* Botón para confirmar turno */}
      {profesionalSeleccionado && (
        <div>
          <button onClick={handleConfirmarTurno}>Confirmar Turno</button>
        </div>
      )}
    </section>
  );
};

export default NuevoTurno;