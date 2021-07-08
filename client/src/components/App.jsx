import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import Home from './Home';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import AuthContext from '../contexts/AuthContext';
import '../styles.sass';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      <Switch>
        <AuthContext.Provider value={[loggedIn, setLoggedIn]}>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" /> }
          </Route>
          <Route exact path="/dashboard">
            {loggedIn ? <Dashboard /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login">
            {loggedIn ? <Redirect to="/dashboard" /> : <Login />}
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </AuthContext.Provider>
      </Switch>
    </div>
  );
};

export default App;
