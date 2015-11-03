var Univs = require('./../../models/univ');

module.exports = function(req,res){

  var result = [];
  Univs.find({school: req.query.departQuery}, function(err,docs){
    for(var i = 0; i < docs.length; i++){
      var dupCheck = false; //false means not Duplicated, true means Duplicated
      if(i == 0) result.push(docs[0].department);
      for(var j = 0; !dupCheck && j < result.length; j++){
        if(docs[i].department == result[j]) dupCheck = true;
        if(!dupCheck && j == result.length-1) result.push(docs[i].department);
      }
    }

    res.send({searchResult : result});
  });
};