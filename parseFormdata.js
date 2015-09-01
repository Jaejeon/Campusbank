
module.exports = function(req,res){
    var formStr = JSON.stringify(req.body);
    var splitResult = formStr.split(",");
    for(i=0; i<splitResult.length; i++){
        console.log(splitResult[i]);
    }
};