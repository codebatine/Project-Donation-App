import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ProjectForm from './components/ProjectForm';
import ProjectsList from './components/ProjectsList';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="App">
        <h1>Donation Platform</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            {token ? (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/projects/new">Create Project</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/login"
            element={<Login setToken={setToken} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/projects/new"
            element={<ProjectForm token={token} />}
          />
          <Route
            path="/projects"
            element={<ProjectsList />}
          />
          <Route
            path="/"
            element={<h2>Welcome to the Donation Platform</h2>}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
