const {
  ExtractJwt,
  Strategy
} = require('passport-jwt');
const {
  secret
} = require('../config/config.json');
const mongoose = require('mongoose');
const User = require('../models/user.model');

const SECRET = secret;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
};

module.exports = passport => {
  passport.use(new Strategy(opts, (payload, done) => {
    User.findById(payload.Id)
      .then(user => {
        if (user) {
          return done(null, {
            id: user.id,
            name: user.userName,
            email: user.email
          });
        }
        return done(null, false);

      }).catch(err => console.log(err));
  }));
};
