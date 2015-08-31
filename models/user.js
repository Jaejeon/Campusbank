var mongoose = require('mongoose');

//Schema for 'User'
var UserSchema = mongoose.Schema({
  email: String,
  password: String,
  birth: Date,
  usertype: String,
  username: String
});

UserSchema.methods.dbSuccess = function(){
  var printing = this.email
    ? "User-email: " + this.email + "*****" + "User-id: " + this._id
    : "##### Not appropriate user register #####";
  console.log(printing);
};

//model 'User' and export 'User'
//In mongoose.model('WHATNAME', Schema), "whatnames" modified from 'WHATNAME' will be the COLLECTION_NAME in DATABASE
module.exports = mongoose.model('user', UserSchema);