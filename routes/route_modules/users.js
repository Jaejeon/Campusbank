/**
 * Created by ±¸ÀçÀü on 2015-11-20.
 */
var express = require('express');
var router = express.Router();
var User = require('../../models/user.js');
var LoanSchema = require('../../models/schema/schema_loan.js');
var async = require('async');

router.post('/:user_id/credit', function(req,res,next){
  if(req.user._id != req.params.user_id) return res.json({success: false, message: "Not appropriate access"});

  var foreignLangs = [];
  var licenses = [];
  var loans = [];

  async.series([
    function(callback){
      for( item in req.body.edu_foreigns){
        foreignLangs.push({ exam: req.body.edu_foreigns[item].exam, score: req.body.edu_foreigns[item].score, validation: req.body.edu_foreigns[item].validation });
      }
      for( item in req.body.edu_licenses){
        licenses.push({ exam: req.body.edu_licenses[item].exam, score: req.body.edu_licenses[item].score, validation: req.body.edu_licenses[item].validation });
      }

      for( item in req.body.loan_details){
        loans.push({ where: req.body.loan_details[item].where, category: req.body.loan_details[item].category, amount: req.body.loan_details[item].amount });
      }
      callback(null);
    },
    function(callback){
      callback(null);
    }
  ], function(err, results){
    User.update({_id:req.params.user_id}, { credit: {
      sex: req.body.sex,
      military: req.body.military,
      status: req.body.status,
      //TODO: Credit scoring addition
      credit: '',
      income:{ exist: req.body.income_exist, jopType: req.body.income_jobType, amount: req.body.income_amount },
      address:{ newSystem: req.body.address_new, oldSystem: req.body.address_old, zipCode: req.body.address_zipCode },
      eduInfo:{ school: req.body.edu_school, depart: req.body.edu_depart, major: req.body.edu_major, addmissionYear: req.body.edu_addmission,
        completeTerm: req.body.edu_complete, gpa: req.body.edu_gpa, gpaMax: req.body.edu_gpaMax, foreignLang: foreignLangs, license: licenses },
      loanInfo:{ exist: req.body.loan_exist, amount: req.body.loan_amount, details: loans }
    }}, function(err, user){
      if(err) res.json({ success: false, message: err });
      else res.json({ success: true, message: null });
    });
  });

});

router.post('/:user_id/loans', function(req,res,next){
  if(req.user._id != req.params.user_id) return res.json({success: false, message: "Not appropriate access"});

  var loanCards = {};

  async.series([
    function(callback){
      loanCards = { purpose: req.body.purpose, purpose_detail: req.body.purpose_detail, loan_type: req.body.loan_type,
        total_amount: req.body.total_amount, min_amount: req.body.min_amount, grace_period: req.body.grace_period, payback_period: req.body.payback_period,
        createdAt: new Date() };

      callback(null);
    },
    function(callback){
      callback(null);
    }
  ], function(err, results){
    User.update({_id:req.params.user_id}, { $addToSet: {loans:loanCards}
    }, function(err, user){
      if(err) res.json({ success: false, message: err });
      else res.json({ success: true, message: null });
    });
  });

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