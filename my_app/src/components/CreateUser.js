import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CreateUser() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    age: "",
    password: "",
  });

  // State to handle success/error messages
  const [message, setMessage] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/person/save", formData);
      setMessage("User created successfully!");
      setFormData({ name: "", address: "", age: "", password: "" });
    } catch (error) {
      setMessage("Error creating user. Please try again.");
      console.error("There was an error saving the user!", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create User
        </button>
      </form>

      {message && <div className="alert mt-3">{message}</div>}
    </div>
  );
}
