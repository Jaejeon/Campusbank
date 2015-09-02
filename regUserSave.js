var RegUser = require('./models/reg-user');

module.exports = function(req, res){

  var newUser = new RegUser({
    email: req.postVal[req.postKey.indexOf("email")],
    password: req.postVal[req.postKey.indexOf("password")],
    birth:  req.postVal[req.postKey.indexOf("birthDay")],
    usertype: req.postVal[req.postKey.indexOf("usertype")],
    username: req.postVal[req.postKey.indexOf("username")]
  });

  //newUser info to DATABASE
  newUser.save(function(err, newuser){
    if(err) return console.log(err);
  });

  return newUser;
};