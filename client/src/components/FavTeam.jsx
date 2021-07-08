import React from 'react';
import axios from 'axios';
import teams from '../teams';

const FavTeam = ({ user, favTeam, setTeam }) => {
  const updateTeam = (e) => {
    axios({
      method: 'put',
      data: {
        username: user,
        team: e.target.value,
      },
      url: 'http://localhost:6969/user/favoriteTeam',
    })
      .then(() => {
        setTeam(e.target.value);
      });
  };
  return (
    <>
      <label htmlFor="teams">
        Favorite Team:
        <select onChange={updateTeam} name="teams">
          <option value="" selected={favTeam === null} disabled hidden>Select Team</option>
          {teams.map((team) => (
            <option key={team} selected={favTeam === team}>{team}</option>
          ))}
        </select>
      </label>
    </>
  );
};

export default FavTeam;
