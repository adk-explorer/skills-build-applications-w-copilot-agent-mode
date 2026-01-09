import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ActivityList from './components/ActivityList';
import TeamList from './components/TeamList';
import Leaderboard from './components/Leaderboard';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            🐙 OctoFit Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={() => setCurrentPage('dashboard')}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities" onClick={() => setCurrentPage('activities')}>
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams" onClick={() => setCurrentPage('teams')}>
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard" onClick={() => setCurrentPage('leaderboard')}>
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="py-5">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1 className="mb-4">Welcome to OctoFit Tracker</h1>
                  <div className="row">
                    <div className="col-lg-6 mb-4">
                      <ActivityList />
                    </div>
                    <div className="col-lg-6 mb-4">
                      <TeamList />
                    </div>
                  </div>
                </div>
              }
            />
            <Route
              path="/activities"
              element={
                <div>
                  <h1 className="mb-4">Activities</h1>
                  <ActivityList />
                </div>
              }
            />
            <Route
              path="/teams"
              element={
                <div>
                  <h1 className="mb-4">Teams</h1>
                  <TeamList />
                </div>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <div>
                  <h1 className="mb-4">Leaderboard</h1>
                  <Leaderboard />
                </div>
              }
            />
          </Routes>
        </div>
      </main>

      <footer className="bg-light py-4 mt-5">
        <div className="container text-center text-muted">
          <small>&copy; 2026 OctoFit Tracker. Stay active with your team!</small>
        </div>
      </footer>
    </Router>
  );
}

export default App;
