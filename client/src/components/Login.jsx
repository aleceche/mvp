import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const Login = () => {
  const [loggedIn, setLoggedIn] = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = () => {
    axios({
      method: 'post',
      data: {
        username,
        password,
      },
      withCredentials: true,
      url: 'http://localhost:6969/login',
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) { setLoggedIn(true); }
      });
  };
  return (
    <div id="login">
      <form>
        <div className="header">
          BEISBOL
          <br />
          <br />
          Sign In
        </div>
        <div className="credentials">
          <label htmlFor="username">
            <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label htmlFor="password">
            <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <div className="btns">
          <Link to="/register" className="link">Create account</Link>
          <button type="button" onClick={login} className="btn">Log In</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
