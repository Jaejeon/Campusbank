var Univs = require('./models/univ');

module.exports = function(req,res){

  var result = [];
  Univs.find({school: req.query.majorQuery[0], department: req.query.majorQuery[1]}, function(err,docs){
    for(var i = 0; i < docs.length; i++){
      result.push(docs[i].major);
    }

    res.send(result);
  });
};