import React, { useState, useEffect } from 'react';
import api from '../services/api';

function ActivityList() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const data = await api.getActivities();
        setActivities(data.results || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">Recent Activities</h5>
      </div>
      <div className="card-body">
        {activities.length === 0 ? (
          <p className="text-muted">No activities yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Activity</th>
                  <th>Duration (min)</th>
                  <th>Distance (km)</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td>{activity.user?.username || 'Unknown'}</td>
                    <td>{activity.activity_type}</td>
                    <td>{activity.duration_minutes}</td>
                    <td>{activity.distance_km || '-'}</td>
                    <td>{new Date(activity.timestamp).toLocaleDateString()}</td>
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

export default ActivityList;
