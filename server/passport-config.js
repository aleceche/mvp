const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../database/user');

function initialize(passport) {
  passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ where: { username } })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        return bcrypt.compare(password, user.password)
          .then((res) => {
            if (res === false) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err);
      });
  });
}

module.exports = initialize;
