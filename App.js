import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedUser) {
      // If a user is selected, update the user
      fetch(`/api/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((updatedUser) => {
          const updatedUsers = users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          );
          setUsers(updatedUsers);
          setFormData({ firstName: '', lastName: '', email: '' });
          setSelectedUser(null);
        });
    } else {
      // If no user is selected, create a new user
      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers([...users, data]);
          setFormData({ firstName: '', lastName: '', email: '' });
        });
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  };

  const handleDeleteUser = (userId) => {
    fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        setFormData({ firstName: '', lastName: '', email: '' });
        setSelectedUser(null);
      });
  };

  return (
    <div className="App">
      <h1>User Management System</h1>
      <div>
        <h2>Create User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <button type="submit">
            {selectedUser ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
      <div>
        <h2>User List</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.firstName} {user.lastName} - {user.email}
              <button onClick={() => handleEditUser(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;






































// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
