var mongoose = require('mongoose');

var UnivSchema = mongoose.Schema({
  school: String,
  schoolCode: Number,
  department: String,
  major: String,
  majorCode1: Number,
  majorCode2: Number,
  gpaMean: Number,
  gpaSd: Number,
  jobrate: Number,
  score: Number
});

module.exports = mongoose.model('univ', UnivSchema);
