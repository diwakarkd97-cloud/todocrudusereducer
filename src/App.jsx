import React, { useReducer, useState, useEffect } from 'react';
import UserCard from './components/UserCard';
import AddUserModal from './components/AddUserModal';
import './App.css';

const API_URL = 'https://6ad1ee2d66cd28aed82d5d55.mockapi.io/users';

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  SET_ERROR: 'SET_ERROR'
};

const initialState = {
  users: [],
  loading: false,
  error: null
};

function userReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: true, error: null };

    case ACTIONS.FETCH_SUCCESS:
      return { ...state, loading: false, users: action.payload };

    case ACTIONS.ADD_USER:
      return { ...state, loading: false, users: [action.payload, ...state.users] };

    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        )
      };

    case ACTIONS.DELETE_USER:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user.id !== action.payload)
      };

    case ACTIONS.SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: ACTIONS.SET_LOADING });
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to load data');
        const data = await res.json();
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
      } catch (err) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async (formData) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newUser = await res.json();
      dispatch({ type: ACTIONS.ADD_USER, payload: newUser });
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateUser = async (id, updatedFields) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });
      const updatedUser = await res.json();
      dispatch({ type: ACTIONS.UPDATE_USER, payload: updatedUser });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      dispatch({ type: ACTIONS.DELETE_USER, payload: id });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="app-container">
      <header className="page-header">
        <h1>User Datas</h1>
        <button
          type="button"
          className="btn-plus"
          onClick={() => setIsModalOpen(true)}
          aria-label="Add user"
        >
          +
        </button>
      </header>

      <div className="workspace">
        <section className="user-list">
          {state.loading && state.users.length === 0 && (
            <p className="info-msg">Loading records...</p>
          )}

          {state.error && <p className="error-msg">{state.error}</p>}

          {state.users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onUpdate={handleUpdateUser}
              onDelete={handleDeleteUser}
            />
          ))}
        </section>

        {isModalOpen && (
          <AddUserModal
            onClose={() => setIsModalOpen(false)}
            onAdd={handleAddUser}
          />
        )}
      </div>
    </div>
  );
}