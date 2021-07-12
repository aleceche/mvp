const MlbStatsAPI = require('mlb-stats-api');
const db = require('./database');
const User = require('./user');
const Team = require('./team');
// const Player = require('./player');

User.belongsTo(Team, { foreignKey: 'favoriteTeam' });
Team.hasMany(User, { foreignKey: 'favoriteTeam' });
// User.belongsToMany(Player, { foreignKey: 'question_id' });
// Player.belongsToMany(User, { foreignKey: 'question_id' });

const mlbStats = new MlbStatsAPI();

db.sync()
  .then(() => {
    console.log('db synced');
    return mlbStats.getTeams({ params: { sportId: 1 } });
  })
  .then((results) => {
    results.data.teams.forEach((team) => {
      const newTeam = Team.build({
        api_id: team.id,
        name: team.name,
        clubName: team.clubName,
        abbreviation: team.abbreviation,
        league: team.league.name,
        division: team.division.name,
      });
      newTeam.save();
    });
  })
  .catch((err) => console.error(err));
