
module.exports = function(req,res){
    var postKey = [];
    var postVal = [];
    var formStr = JSON.stringify(req.body);
    var splitResult = formStr.split(",");
    for(i=0; i<splitResult.length; i++){
        var subSplit = splitResult[i].split(":");
        if(i%2 === 0){
            postKey.push(subSplit[1].split('"')[1]);
        }
        else{
            postVal.push(subSplit[1].split('"')[1]);
        }
    }

    //postKey is for "parameter names"
    req.postKey = postKey;

    //postVal is for "parameter values"
    req.postVal = postVal;
};