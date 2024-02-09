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
    // Fetch specializations
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
    // Convertir el objeto formData a JSON
    const jsonData = JSON.stringify(formData);
    // Realizar la solicitud POST con jsonData en el cuerpo
    axios
      .post("https://citas-medicas-api.onrender.com/doctor", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Doctor added successfully:", response.data);
        // Aquí podrías redirigir a otra página o mostrar un mensaje de éxito
      })
      .catch((error) => {
        console.error("Error adding doctor:", error);
        // Aquí podrías mostrar un mensaje de error al usuario
      });
  };

  return (
    <div>
      <h2>Add Doctor</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Last Name:</label>
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
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label>Specialization:</label>
        <select
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        >
          <option value="">Select Specialization</option>
          {specializations.map((spec) => (
            <option key={spec._id} value={spec._id}>
              {spec.name}
            </option>
          ))}
        </select>
        <label>Start Time:</label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
        <label>End Time:</label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddDoctor;