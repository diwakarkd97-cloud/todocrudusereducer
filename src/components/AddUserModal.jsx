import React, { useState } from 'react';

export default function AddUserModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    mobileNo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="modal-container">
      <div className="card modal-card">
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Close form"
        >
          ☓
        </button>

        <form onSubmit={handleSubmit} className="card-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="mobileNo"
            placeholder="Mobile no"
            value={formData.mobileNo}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-add">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}