import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const Login = () => {
  const [loggedIn, setLoggedIn] = useContext(AuthContext);
  const [badCredentials, setBadCredentials] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = (e) => {
    e.preventDefault();
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
        if (res.data === 'Invalid User Credentials') {
          setBadCredentials(true);
        } else if (res.status === 200) { setLoggedIn(true); }
      })
      .finally(() => {
        e.target.reset();
      });
  };
  return (
    <div id="login">
      <form onSubmit={login}>
        <div className="header">
          BEISBOL
          <br />
          <br />
          Sign In
        </div>
        <div className="credentials">
          {badCredentials ? <div className="red-text">Invalid Login Credentials</div> : <></>}
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
                if (badCredentials) { setBadCredentials(false); }
              }}
              required
            />
          </label>
          <br />
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                if (badCredentials) { setBadCredentials(false); }
              }}
              required
            />
          </label>
        </div>
        <div className="btns">
          <Link to="/register" className="link">Create account</Link>
          <button type="submit" className="btn">Log In</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
