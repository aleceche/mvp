import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import UserContext from '../contexts/UserContext';
import FavTeam from './FavTeam';

const Dashboard = ({ user }) => {
  const [loggedIn, setLoggedIn] = useContext(AuthContext);
  const [username, setUsername] = useContext(UserContext);
  const [favTeam, setFavTeam] = useState(null);
  const logout = () => {
    axios({
      method: 'get',
      url: 'http://localhost:6969/logout',
    })
      .finally(() => {
        setUsername(null);
        setLoggedIn(false);
      });
  };
  const setTeam = (team) => {
    setFavTeam(team);
  };
  useEffect(() => {
    if (user) {
      axios({
        method: 'get',
        url: `http://localhost:6969/${user}/favoriteTeam`,
      })
        .then((res) => {
          if (res.data !== 'No favorite team set') {
            setFavTeam(res.data);
          }
        });
    }
  });
  return username ? (
    <div>
      <header>
        {`Hi ${user}`}
        <FavTeam user={user} favTeam={favTeam} setTeam={setTeam} />
        <br />
        <button type="button" onClick={logout}>Logout</button>
      </header>
      <section>
        Show standings (API broken - empty standings)
      </section>
      <section>
        Show players here (API broken - cannot get players)
      </section>
      <aside>
        Show team news here
      </aside>
    </div>
  ) : null;
};

export default Dashboard;
