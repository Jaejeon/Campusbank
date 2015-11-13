var mongoose = require('mongoose');
var schemas = require('./schema/schema_loan.js');

var foreignLangSchema = schemas.foreignLangSchema;
var licenseSchema = schemas.licenseSchema;
var loanSchema = schemas.loanSchema;

//Schema for 'User'
var UserSchema = mongoose.Schema({
  email: String,
  password: String,
  birth: Date,
  usertype: String,
  username: String,
  loan:{
    sex: String, //male, female
    military: Boolean, //military service true, false
    status: String, // graduate, inSchool, LOA (leave of absence)
    credit: String, // A+, A0, A-, B+, B0, B-, ...
    income:{
      exist: Boolean, // income exist, or not
      jobType: String, // regular, temporary
      amount: Number  // amount of income
    },
    address:{
      newSystem: String, // Road Name Address
      oldSystem: String, // parcel address
      zipCode: String
    },
    eduInfo:{
      school: String, // korea, yousei, seoul, ...
      depart: String,
      major: String, // business management, computer science, ...
      admissionYear: Number, // 2010, 2011, 2012, ...
      completeTerm: Number, // 2, 3, 4, ...
      gpa: Number, // 3.3, 4.1, ...
      gpaMax: Number, // 4.3, 4.5
      foreignLang: [foreignLangSchema],
      license: [licenseSchema]
    },
    loanInfo:{
      exist: Boolean, // loan history existence
                      // true, false
      amount: Number, // 1000, 1500, ...
      loan: [loanSchema]
    }
  },
  lend:{

  }
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