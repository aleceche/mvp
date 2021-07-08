import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const login = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      data: {
        username,
        password,
        firstName,
        lastName,
        email,
      },
      withCredentials: true,
      url: 'http://localhost:6969/register',
    })
      .then(() => {
        // e.target.reset();
      });
  };
  return (
    <div id="register">
      <form onSubmit={login}>
        <div className="header">
          Create An Account
        </div>
        <div className="credentials">
          <label htmlFor="username">
            <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <label htmlFor="password">
            <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <label htmlFor="firstName">
            <input type="text" name="firstName" placeholder="First Name (e.g. Bob)" onChange={(e) => setFirstName(e.target.value)} required />
          </label>
          <label htmlFor="lastName">
            <input type="text" name="lastName" placeholder="Last Name (e.g. Jones)" onChange={(e) => setLastName(e.target.value)} required />
          </label>
          <label htmlFor="email">
            <input type="email" name="email" placeholder="Email (e.g. bobjones@gmail.com)" onChange={(e) => setEmail(e.target.value)} required />
          </label>
        </div>
        <div className="btns">
          <Link to="/login" className="link">Back to Login</Link>
          <button type="submit" className="btn">Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
