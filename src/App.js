import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Todos from './components/Todos';
import Profile from './components/Profile';
import {jwtDecode} from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);
  const [isProfile, setIsProfile] = useState(false);

  // Check if there's a token stored in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className="container mt-5">
      {!user ? (
        <Auth setUser={setUser} />
      ) : (
        <>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          {!isProfile ? (
            <>
              <Todos user={user} />
              <button className="btn btn-info mt-3" onClick={() => setIsProfile(true)}>Edit Profile</button>
            </>
          ) : (
            <Profile user={user} setUser={setUser} setIsProfile={setIsProfile} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
