import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';
import './Login.css'; // Make sure to create this CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('email', email);
      navigate(response.data.role === 'ATT_Admin_User' ? '/admin' : '/home');
    } catch {
      // alert('Invalid login credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
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
          <div className="options">
            {/* <label>
              <input type="checkbox" /> Remember Me
            </label> */}
            {/* <button type="button" className="link-button">Forget Password</button> */}
          </div>
          <button type="submit" className="login-button">Log in</button>
          <p className="register-link">
  Don’t have an account?{' '}
  <span className="link-button" onClick={() => navigate('/register')}>
    Register
  </span>
</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
