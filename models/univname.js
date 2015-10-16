var mongoose = require('mongoose');

var UnivnameSchema = mongoose.Schema({
    school: String
});

module.exports = mongoose.model('univname', UnivnameSchema);
