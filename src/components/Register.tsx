import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api/api';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ATT_User');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, { email, password, role });
      setSuccessMessage(response.data);
      setErrorMessage('');
      setTimeout(() => navigate('/'), 2000); // redirect after 2 sec
    } catch (error: any) {
      setErrorMessage(error.response?.data || 'Registration failed');
      setSuccessMessage('');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleRegister} className="register-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="ATT_User">Normal User</option>
              <option value="ATT_Admin_User">Admin User</option>
            </select>
          </div>
          <button type="submit" className="register-button">Register</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <p className="login-link">
            Already have an account? <span className="link-button" onClick={() => navigate('/')}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
