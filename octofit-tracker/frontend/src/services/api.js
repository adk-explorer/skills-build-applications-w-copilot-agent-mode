// API service for OctoFit Tracker backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = {
  // Activities
  getActivities: async (userId = null) => {
    const url = userId ? `${API_BASE_URL}/activities/?user_id=${userId}` : `${API_BASE_URL}/activities/`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch activities');
    return response.json();
  },

  createActivity: async (activity) => {
    const response = await fetch(`${API_BASE_URL}/activities/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activity),
    });
    if (!response.ok) throw new Error('Failed to create activity');
    return response.json();
  },

  // Teams
  getTeams: async () => {
    const response = await fetch(`${API_BASE_URL}/teams/`);
    if (!response.ok) throw new Error('Failed to fetch teams');
    return response.json();
  },

  createTeam: async (team) => {
    const response = await fetch(`${API_BASE_URL}/teams/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(team),
    });
    if (!response.ok) throw new Error('Failed to create team');
    return response.json();
  },

  // Memberships
  getMemberships: async () => {
    const response = await fetch(`${API_BASE_URL}/memberships/`);
    if (!response.ok) throw new Error('Failed to fetch memberships');
    return response.json();
  },

  createMembership: async (membership) => {
    const response = await fetch(`${API_BASE_URL}/memberships/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(membership),
    });
    if (!response.ok) throw new Error('Failed to create membership');
    return response.json();
  },

  // Leaderboards
  getUserLeaderboard: async () => {
    const response = await fetch(`${API_BASE_URL}/leaderboard/users/`);
    if (!response.ok) throw new Error('Failed to fetch user leaderboard');
    return response.json();
  },

  getTeamLeaderboard: async () => {
    const response = await fetch(`${API_BASE_URL}/leaderboard/teams/`);
    if (!response.ok) throw new Error('Failed to fetch team leaderboard');
    return response.json();
  },
};

export default api;
