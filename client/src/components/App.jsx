import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import AuthContext from '../contexts/AuthContext';
import UserContext from '../contexts/UserContext';
import '../styles.sass';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:6969/dashboard',
    })
      .then((res) => {
        if (res.data !== 'Invalid User Credentials') {
          setUsername(res.data);
          setLoggedIn(true);
        }
      })
      .catch(console.error)
      .finally(() => {
        setRendered(true);
      });
  });
  return rendered ? (
    <div>
      <Switch>
        <AuthContext.Provider value={[loggedIn, setLoggedIn]}>
          <UserContext.Provider value={[username, setUsername]}>
            <Route exact path="/">
              {loggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" /> }
            </Route>
            <Route exact path="/dashboard">
              {loggedIn ? <Dashboard user={username} /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/login">
              {loggedIn ? <Redirect to="/dashboard" /> : <Login />}
            </Route>
            <Route exact path="/register">
              {loggedIn ? <Redirect to="/dashboard" /> : <Register />}
            </Route>
          </UserContext.Provider>
        </AuthContext.Provider>
      </Switch>
    </div>
  ) : null;
};

export default App;
