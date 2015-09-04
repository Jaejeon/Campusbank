var mongoose = require('mongoose');

//Schema for 'User'
var UserAuthnumSchema = mongoose.Schema({
  email: String,
  authnum: String,
  createdAt: {type: Date, expires:500}
});

//model 'User' and export 'User'
//In mongoose.model('WHATNAME', Schema), "whatnames" modified from 'WHATNAME' will be the COLLECTION_NAME in DATABASE
module.exports = mongoose.model('userAuthnum', UserAuthnumSchema);