const Sequelize = require('sequelize');
const db = require('./database');

const Teams = db.define('teams', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    validate: {
      isInt: true,
    },
  },
  api_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  abbreviation: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUppercase: true,
    },
  },
  league: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['National League', 'American League']],
    },
  },
  division: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  timestamps: false,
});

module.exports = Teams;
