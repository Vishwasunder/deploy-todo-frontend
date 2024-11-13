import React, { useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'https://deploy-todo-backend.onrender.com/api/login' : 'https://deploy-todo-backend.onrender.com/api/signup';
    
    try {
      const res = await axios.post(url, { email, password, name });
      const { token } = res.data;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (err) {
      console.error(err.response?.data?.message || 'Error during authentication');
    }
  };

  return (
    <div className="col-md-4 offset-md-4">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="form-group">
        {!isLogin && (
          <input 
            type="text" 
            className="form-control mb-2" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        )}
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
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" className="btn btn-primary btn-block">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} className="btn btn-link">
        {isLogin ? 'Create an account' : 'Already have an account?'}
      </button>
    </div>
  );
}

export default Auth;
