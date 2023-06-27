import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        navigate('/');
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    await firebase.auth().signOut();
    setUser(null);
  };

  return (
    <div>
      {/* <LoginScreen user={user} /> */}
      {user ? (
        <div>
          <h7>Welcome, {user.displayName}!  </h7>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Sign In</p>
      )}
    </div>
  );
}

export default Dashboard;
