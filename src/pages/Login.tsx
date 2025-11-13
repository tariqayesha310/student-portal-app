import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegistering) {
        await register(email, password, name);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err) {
      setError(isRegistering ? 'Registration failed' : 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isRegistering ? 'Create Account' : 'Sign In'}</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {isRegistering && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-btn">
            {isRegistering ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        <div className="login-toggle">
          {isRegistering ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="link-btn"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className="link-btn"
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
