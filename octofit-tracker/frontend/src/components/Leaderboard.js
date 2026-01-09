import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Leaderboard() {
  const [userStats, setUserStats] = useState([]);
  const [teamStats, setTeamStats] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        setLoading(true);
        const [users, teams] = await Promise.all([
          api.getUserLeaderboard(),
          api.getTeamLeaderboard(),
        ]);
        setUserStats(users);
        setTeamStats(teams);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboards();
  }, []);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">Leaderboard</h5>
      </div>
      <div className="card-body">
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'teams' ? 'active' : ''}`}
              onClick={() => setActiveTab('teams')}
            >
              Teams
            </button>
          </li>
        </ul>

        {activeTab === 'users' && (
          <div className="table-responsive">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Total Distance (km)</th>
                  <th>Total Duration (min)</th>
                  <th>Activities</th>
                </tr>
              </thead>
              <tbody>
                {userStats.map((stat, idx) => (
                  <tr key={stat.user_id || idx}>
                    <td>{idx + 1}</td>
                    <td>{stat.username}</td>
                    <td>{(stat.total_distance || 0).toFixed(2)}</td>
                    <td>{stat.total_duration || 0}</td>
                    <td>{stat.activity_count || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="table-responsive">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>Total Distance (km)</th>
                  <th>Total Duration (min)</th>
                  <th>Activities</th>
                </tr>
              </thead>
              <tbody>
                {teamStats.map((stat, idx) => (
                  <tr key={stat.team_id || idx}>
                    <td>{idx + 1}</td>
                    <td>{stat.team_name}</td>
                    <td>{(stat.total_distance || 0).toFixed(2)}</td>
                    <td>{stat.total_duration || 0}</td>
                    <td>{stat.activity_count || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
