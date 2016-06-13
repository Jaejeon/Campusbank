var express = require('express');
var router = express.Router();
var parseFormdata = require('./js_module/parseFormData.js');
var mongoose = require('mongoose');
var User = require('../models/user.js');
var schemas = require('../models/schema/schema_loan.js');

router.post('/loan/credit-auth', function(req,res,next){
  parseFormdata(req,res);
  console.log(req.postKey);
  console.log(req.postVal);

  var dbquery = User.find({_id: req.user._id}).limit(1);

  var License = mongoose.model('License', schemas.licenseSchema);
  var license = [new License()];
  var ForeignLang = mongoose.model('ForeignLang', schemas.foreignLangSchema);
  var foreignLang = [new ForeignLang()];

  var eduInfo_json = {
    school: req.postVal[9],
    depart: req.postVal[10],
    major: req.postVal[11],
    admissionYear: req.postVal[12],
    completeTerm: req.postVal[13],
    gpa: 0,
    gpaMax: 0,
    license: license,
    foreignLang: foreignLang
  };

  var Loan = mongoose.model('Loan', schemas.loanSchema);
  var loan = [new Loan()];

  var loanInfo_json = {
    exist: true,
    amount: 0,
    loan: loan
  };
  var address_json = {
    newSystem: '',
    oldSystem: '',
    zipCode: ''
  };
  var income_json = {
    exist: true,
    jobType: '',
    amount: 0
  };
  var loan_json = {
    sex : req.postVal[0],
    military: req.postVal[1],
    status: req.postVal[2],
    credit: '',
    loanInfo: loanInfo_json,
    eduInfo:eduInfo_json,
    address:address_json,
    income:income_json
  };

  console.log(loan_json);

  dbquery.exec(function(err,docs){ });
});

module.exports = router;