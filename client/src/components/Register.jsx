import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const login = () => {
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
      .then((res) => console.log(res.data));
  };
  return (
    <div id="register">
      <form>
        <div className="header">
          Create An Account
        </div>
        <div className="credentials">
          <label htmlFor="username">
            <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label htmlFor="password">
            <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label htmlFor="firstName">
            <input type="text" name="firstName" placeholder="Bob" onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <label htmlFor="lastName">
            <input type="text" name="lastName" placeholder="Jones" onChange={(e) => setLastName(e.target.value)} />
          </label>
          <label htmlFor="email">
            <input type="email" name="email" placeholder="bobjones@gmail.com" onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <div className="btns">
          <button type="button" onClick={login} className="btn">Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
