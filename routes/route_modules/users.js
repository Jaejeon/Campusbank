/**
 * Created by ±¸ÀçÀü on 2015-11-20.
 */
var express = require('express');
var router = express.Router();
var User = require('../../models/user.js');
var LoanSchema = require('../../models/schema/schema_loan.js');
var async = require('async');

router.post('/:user_id/credit', function(req,res,next){
  //if(req.user._id != req.params.user_id) return res.json({success: false, message: "Not appropriate access"});

  var foreignLangs = [];
  var temp = LoanSchema.foreignLangSchema;
  temp.exam = "1";
  temp.score = 700;
  temp.validation = new Date();

  console.log(req.body);
  /*
  async.series([
    function(callback){
      //TODO
      console.log(req.body.edu_foreigns);
      for( item in req.body.edu_foreigns){
        console.log(item);
      }
    },
    function(callback){

    }
  ], function(err, results){

  });
  */
  //foreignLangs.push();

  //var licenses = new [LoanSchema.licenseSchema];
  //var loans = new [LoanSchema.loanSchema];

  //console.log(foreignLangs);

  User.update({_id:req.params.user_id}, { credit: {
    sex: req.body.sex,
    military: req.body.military,
    status: req.body.status,
    credit: '',
    income:{ exist: req.body.income_exist, jopType: req.body.income_jobType, amount: 1 },
    address:{ newSystem: req.body.address_new, oldSystem: req.body.address_old, zipCode: req.body.address_zipCode },
    eduInfo:{ school: req.body.edu_school, depart: req.body.edu_depart, major: req.body.edu_major, addmissionYear: 1,
              completeTerm: 1, gpa: 1, gpaMax: 1, foreignLang: '', license: '' },
    loanInfo:{ exist: req.body.loan_exist, amount: 1, loan: '' }
  }}, function(err, user){
    if(err) res.send(err);
    else res.send(user);
  });

});

router.post('/:user_id/loans', function(req,res,next){

});

router.put('/:user_id/credit', function(req,res,next){

});

router.put('/:user_id/loans', function(req,res,next){

});

router.get('/:user_id/credit', function(req,res,next){

});

router.get('/:user_id/loans/:loan_id', function(req,res,next){

});

router.get('/:user_id/loans', function(req,res,next){

});

router.get('/:user_id', function(req,res,next){

});

module.exports = router;