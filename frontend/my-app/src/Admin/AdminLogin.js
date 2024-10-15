import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/admin/AdminLogin.css';
import { server } from '../server';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8081/api/admin/login', { email, password });
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        console.log('Login successful');
        navigate('/admin/dashboard');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Server error:', error.response?.data?.message || 'Unexpected error');
      setError(error.response?.data?.message || 'Unexpected error');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
