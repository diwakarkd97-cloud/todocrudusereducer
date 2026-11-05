import React, { useState } from 'react';

export default function UserCard({ user, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    age: user.age || '',
    email: user.email || '',
    mobileNo: user.mobileNo || user.mobile || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onUpdate(user.id, formData);
    setIsEditing(false);
  };

  
  if (isEditing) {
    return (
      <div className="card edit-card">
        <form onSubmit={handleSave} className="card-form">
          <input
            type="text"
            name="name"
            placeholder={user.name || "Name"}
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder={user.age ? String(user.age) : "Age"}
            value={formData.age}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={user.email || "Email"}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="mobileNo"
            placeholder={user.mobileNo || user.mobile || "Mobile no"}
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />

          <div className="btn-row">
            <button type="submit" className="btn btn-update">
              Update
            </button>
            <button
              type="button"
              className="btn btn-delete"
              onClick={() => onDelete(user.id)}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    );
  }

  // --- VIEW MODE ---
  return (
    <div className="card view-card">
      <div className="card-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile No:</strong> {user.mobileNo || user.mobile}</p>
      </div>

      <div className="btn-row">
        <button
          type="button"
          className="btn btn-edit"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-delete"
          onClick={() => onDelete(user.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}