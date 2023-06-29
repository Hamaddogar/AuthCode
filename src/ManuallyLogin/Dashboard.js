import React from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
