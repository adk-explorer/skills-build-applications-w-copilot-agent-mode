import React, { useState, useEffect } from 'react';
import api from '../services/api';

function TeamList() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const data = await api.getTeams();
        setTeams(data.results || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">Teams</h5>
      </div>
      <div className="card-body">
        {teams.length === 0 ? (
          <p className="text-muted">No teams yet.</p>
        ) : (
          <div className="row">
            {teams.map((team) => (
              <div key={team.id} className="col-md-6 mb-3">
                <div className="card border-light">
                  <div className="card-body">
                    <h6 className="card-title">{team.name}</h6>
                    <p className="card-text small text-muted">{team.description}</p>
                    <p className="mb-0">
                      <small className="badge bg-secondary">
                        {team.members?.length || 0} members
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamList;
