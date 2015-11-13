var mongoose = require('mongoose');

//Schema for 'LoanCard'
var LoanCardSchema = mongoose.Schema({
  loanee_id:String,
  lender_id: String,
  create_time: Date,
  limit_time: Date,
  amount: Number,
  period: Number,
  interest: Number,
  purpose: String,
  credit: String,
  school: String,
  major: String,
  complete: Boolean
});

LoanCardSchema.methods.dbSuccess = function(){
  var printing = this._id
    ? "Loancard number : " + this._id + "*****"
    : "##### Not appropriate Loancard register #####";
  console.log(printing);
};

//model 'LoanCard' and export 'LoanCard'
//In mongoose.model('WHATNAME', Schema), "whatnames" modified from 'WHATNAME' will be the COLLECTION_NAME in DATABASE
module.exports = mongoose.model('loanCard', LoanCardSchema);