var express = require('express');
var router = express.Router();
var User = require('../models/user');
var login = require('./login.js');

module.exports = function(passport){
  passport.serializeUser(function(user, done){
    console.log('Serializing user');
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      console.log('Deserializing user');
      done(err,user);
    });
  });

  login(passport);
};