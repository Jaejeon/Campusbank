var User = require('./../../models/user');

module.exports = function(req,res){
  var result = User.find({email: req.user.email}).limit(1);

  result.exec(function(err,docs){
    if(err) return console.log(err);

    for(var i in docs){
      docs[i]._id = undefined;
    }

    res.render('loan/register', {docs:docs});
  });

};