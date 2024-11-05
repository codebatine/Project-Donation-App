import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import ProjectDetails from './components/ProjectDetails';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';

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
        <header className="header">
          <div className="header-container">
            <h1>Donation Platform</h1>
            <Navigation
              token={token}
              handleLogout={handleLogout}
            />
          </div>
        </header>
        <Routes>
          <Route
            path="/signup"
            element={<Signup setToken={setToken} />}
          />
          <Route
            path="/login"
            element={<Login setToken={setToken} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard token={token} />}
          />
          <Route
            path="/projects/new"
            element={<ProjectForm token={token} />}
          />
          <Route
            path="/projects"
            element={<ProjectList />}
          />
          <Route
            path="/projects/:id"
            element={<ProjectDetails token={token} />}
          />
          <Route
            path="/chat"
            element={<Chatbot />}
          />{' '}
          {/* Chatbot Route */}
          <Route
            path="/"
            element={<h2>Welcome to the Donation Platform</h2>}
          />
        </Routes>
      </div>
    </Router>
  );
};

const Navigation = ({ token, handleLogout }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkClass = (path) => (location.pathname === path ? 'active' : '');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav>
      <div
        className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={toggleMobileMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={isMobileMenuOpen ? 'nav-links mobile' : 'nav-links'}>
        <li>
          <Link
            to="/"
            className={getLinkClass('/')}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className={getLinkClass('/dashboard')}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/projects"
            className={getLinkClass('/projects')}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            to="/projects/new"
            className={getLinkClass('/projects/new')}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Add
          </Link>
        </li>
        <li>
          <Link
            to="/chat"
            className={getLinkClass('/chat')}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Chatbot
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className={getLinkClass('/signup')}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Signup
          </Link>
        </li>
        {token ? (
          <li>
            <Link
              to="/"
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="logout"
            >
              Logout
            </Link>
          </li>
        ) : (
          <li>
            <Link
              to="/login"
              className={getLinkClass('/login')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default App;
