
var UserAuthNum = require('./../../models/user-authnum');
var randomstring = require('randomstring');

module.exports = function(req, res, newUser){

  var newUserAuthnum = new UserAuthNum({
    email: newUser.email,
    authnum: randomstring.generate(20),
    createdAt: new Date()
  });

  newUserAuthnum.save(function(err, newuserauthnum){
    if(err) return console.log(err);
  });

  return newUserAuthnum;
};