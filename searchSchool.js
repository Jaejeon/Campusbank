var UnivNames = require('./models/univname');

module.exports = function(req,res){

  var re = new RegExp(".*" + req.query.schoolQuery + ".*");
  var query = UnivNames.find({});
  query.where('school').regex(re).exec(function(err,docs){
    res.send({searchResult : docs});
  });

};