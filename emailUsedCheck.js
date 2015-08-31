var async = require('async');
var User = require('./models/user');
var RegUser = require('./models/reg-user');

module.exports = function(req, res){

  async.apply(User.findOne, req, res);
  async.apply(RegUser.findOne, req, res);
  async.waterfall([
    function(callback){
      var used = true;
      //console.log(req.query.email);
      User.findOne({email: req.query.emailWillUse}, function(err,user){
        if(err) {return callback(new Error('emailUsedCheck DB error when access User'));}
        if(!user) {used = false; return callback(used);}
        if(user) {used = true; return res.send(used);}
      });
    },
    function(used, callback){
      RegUser.findOne({email: req.query.emailWillUse}, function(err,user){
        if(err) {return callback(new Error("emailUsedCheck DB error when access RegUser"));}
        if(!user) {used = false; return res.send(used);}
        if(user) {used = true; return res.send(used);}
      });
    }
  ], function(err, result){
    console.log(err);
    return res.send(true);
  });

};