var RegUser = require('./models/reg-user');

module.exports = function(req, res){

  var newUser = new RegUser({
    email: req.body.email,
    password: req.body.password,
    birth:  req.body.birthDay,
    usertype: req.body.usertype,
    username: req.body.username
  });

  //newUser info to DATABASE
  newUser.save(function(err, newuser){
    if(err) return console.log(err);
  });

  return newUser;
};