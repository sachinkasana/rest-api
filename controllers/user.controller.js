const userService = require('../services/user.service');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  secret
} = require('../config/config.json');
const db = require('../db/db');
const User = db.User;

module.exports = {
  getUsersList,
  registerUser,
  login
}

function getUsersList(req, res, next) {
  userService.getAllUsers().then(users => {
      res.json(users);
    })
    .catch(err => {
      next(err);
    })
}

function registerUser(req, res, next) {
 
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  })
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      throw err;
    }
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      
          userService.registerUser(newUser).then(user => {
            if (user) {
              res.json(user);
            }
          }).catch(err => res.status(400).json(err));
       
      
    })
  });


}

function login(req, res, next) {
  userService.login(req.body.email).then(val => {
    if (!val) {
      next("No user found");
    } else {
      bcrypt.compare(req.body.password, val.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: val._id,
            name: val.username,
          };
          jwt.sign(payload, secret, {
            expiresIn: 36000
          }, (err, token) => {
            if (err) res.status(500)
              .json({
                error: "Error signing token",
                raw: err
              });
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          })
        } else {
          return next("Password incorrect")
        }
      })
    }

  }).catch(err => console.log(err));
}
