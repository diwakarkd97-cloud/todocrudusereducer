# User Datas - React CRUD Application

A clean, responsive User Management web application built with **React** and **MockAPI**. The application demonstrates intermediate React patterns—centralizing asynchronous CRUD operations inside a single `useReducer` state machine, managing UI modal states with `useState` and conditional rendering, and presenting records in a responsive, wrapping card grid.

---

## Features

- **Full RESTful CRUD Operations:**
  - **Create:** Click the `+` button in the header to open the Add User card and persist records to MockAPI.
  - **Read:** Fetches stored user records automatically on initial mount; state persists across browser refreshes.
  - **Update:** Clicking **Edit** dynamically transforms the user card into an edit form with previous data populated in placeholders and switches actions to **Update** and **Delete**.
  - **Delete:** One-click instant deletion that syncs with MockAPI and updates local state.
- **Predictable State Architecture:**
  - Centralized `useReducer` within `App.jsx` managing all lifecycle actions (`FETCH_SUCCESS`, `ADD_USER`, `UPDATE_USER`, `DELETE_USER`, `SET_LOADING`, `SET_ERROR`).
- **Conditional UI Rendering:**
  - Lightweight modal toggling using `useState` and close `(X)` handlers without external UI libraries.
- **Responsive Flexbox Grid:**
  - Flexible multi-column card layout using `flex-wrap: wrap` that automatically reorganizes across desktop, tablet, and mobile screens.

---

## Tech Stack

- **Frontend Library:** [React](https://react.dev/) (Hooks: `useReducer`, `useState`, `useEffect`)
- **Backend / Mock Database:** [MockAPI](https://mockapi.io/)
- **Styling:** Custom CSS3 (Flexbox, Flex Wrap, Media Queries)
- **Build Tool:** Vite / Create React App

---

## Project Structure

```text
src/
├── components/
│   ├── AddUserModal.jsx    # Form card for adding users with close (X) toggle
│   └── UserCard.jsx        # Dual-mode card (View Mode & Edit/Update Mode)
├── App.css                 # Responsive flex layout and styling
├── App.jsx                 # Root component: useReducer logic & MockAPI integration
├── index.css
└── main.jsx
