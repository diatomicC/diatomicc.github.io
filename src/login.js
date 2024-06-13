import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (input.toLowerCase() === 'poodle') {
      navigate('/map');
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Login</h1>
        <input
          type="text"
          className="input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter password"
        />
        <button
        onClick={handleLogin}
        className="button is-primary"
        style={{ marginTop: '10px' }}  // Adds 10 pixels of space above the button
        >
        Login
        </button>

      </div>
    </div>
  );
};

export default Login;
