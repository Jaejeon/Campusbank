var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport){
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done){
    User.findOne({email: email}, function(err, user){
      if(err) {return done(err);}
      if(!user){
        return done(null, false, { message: 'Incorrect username'});
      }
      if(user.password != password){
        return done(null, false, { message: 'Incorrect password'});
      }

      return done(null, user);
    });
  }));
};