import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addDoctor.css";

const AddDoctor = () => {
  const [specializations, setSpecializations] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    dni: "",
    password: "",
    specialization: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    axios
      .get("https://citas-medicas-api.onrender.com/specialization")
      .then((response) => {
        setSpecializations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching specializations:", error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const jsonData = JSON.stringify(formData);
    axios
      .post("https://citas-medicas-api.onrender.com/doctor", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Doctor added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error adding doctor:", error);
      });
  };

  return (
    <div>
      <h3>Agregar un nuevo doctor a la estructura</h3>
      <br></br>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Apellido:</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>DNI:</label>
        <input
          type="text"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          required
        />
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label>Especialización:</label>
        <select
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione Especialidad</option>
          {specializations.map((spec) => (
            <option key={spec._id} value={spec._id}>
              {spec.name}
            </option>
          ))}
        </select>
        <label>Hora de inicio de jornada:</label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
        <label>Hora de fin de jornada:</label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default AddDoctor;