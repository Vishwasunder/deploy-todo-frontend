import React, { useState } from 'react';
import axios from 'axios';

function Profile({ user, setUser, setIsProfile }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('https://deploy-todo-backend.onrender.com/api/profile', { name, email, password }, config);
      setUser(res.data);
      setIsProfile(false);
    } catch (err) {
      console.error(err.response?.data?.message || 'Error updating profile');
    }
  };

  return (
    <div>
      <h3>Edit Profile</h3>
      <form onSubmit={updateProfile}>
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="email" 
          className="form-control mb-2" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          className="form-control mb-2" 
          placeholder="New Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" className="btn btn-success">Update</button>
      </form>
    </div>
  );
}

export default Profile;
