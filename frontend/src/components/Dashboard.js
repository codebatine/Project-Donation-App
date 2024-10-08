import React from 'react';

const Dashboard = ({ token }) => {
  if (!token) {
    return <h2>Please sign up or log in to see your dashboard.</h2>;
  }

  return (
    <div>
      <h2>Welcome to your Dashboard</h2>
      <p>This is the landing page after login.</p>
    </div>
  );
};

export default Dashboard;
