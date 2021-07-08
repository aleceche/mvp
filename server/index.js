const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
const MlbStatsAPI = require('mlb-stats-api');
const User = require('../database/user');
const Team = require('../database/team');
const initializePassport = require('./passport-config');
require('dotenv').config();

initializePassport(passport);
function verifyUser(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

const app = express();
const PORT = process.env.PORT || 3000;
const mlbStats = new MlbStatsAPI();

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: `http://localhost:${PORT}`, credentials: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(cookieParser('secret'));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// GET
app.get('/login', (req, res) => {
  res.send('hi');
});

app.get('/dashboard', verifyUser, (req, res) => {
  res.status(200).send(req.user);
});

app.get('/standings', (req, res) => {
  // const { team } = req.query;
  mlbStats.getStandings()
    .then((results) => {
      console.log(results);
      res.status(200).send(results.data);
    })
    .catch((err) => res.status(404).send(err));
});

// POST

// LOGIN
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  successFlash: 'Welcome!',
  failureFlash: true,
}));

// REGISTRATION
app.post('/register', (req, res) => {
  const {
    username,
    password,
    firstName,
    lastName,
    email,
  } = req.body;
  User.findOne({ where: { username } })
    .then((user) => {
      if (user) {
        res.status(409).send('A user with this username already exists');
      } else {
        bcrypt.genSalt(10)
          .then((salt) => bcrypt.hash(password, salt))
          .then((hash) => {
            const hashedPassword = hash;
            const user = User.build({
              username,
              password: hashedPassword,
              firstName,
              lastName,
              email,
            });
            user.save();
          })
          .then(() => res.status(201).redirect('/'))
          .catch((err) => res.status(400).send(err));
      }
    });
});

// PUT

// Update user's favorite team
app.put('/user/favoriteTeam', (req, res) => {
  const { username, team } = req.body;
  Team.findOne({ where: { name: team } })
    .then((result) => result.id)
    .then((id) => {
      User.findOne({ where: { username } })
        .then((user) => {
          user.favoriteTeam = id;
          user.save();
        })
        .catch((err) => res.status(404).send(err));
    })
    .then(() => res.status(204).send())
    .catch((err) => res.status(400).send(err));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
