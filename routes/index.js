var express = require('express');
var router = express.Router();
var registerLoanCardProc = require('./js_module/registerLoanCardProc.js');
var path = require('path');

module.exports = function(app){

  router.use('/:type/:page', function(req,res,next){
    if(!req.user){
      res.render('login');
    }
    else{
      next();
    }
  });

  router.use('/:type/:page', function(req,res,next){
    var file_rendered = req.params.type + '/' + req.params.page;
    if(req.params.page === 'register'){
      registerLoanCardProc(req,res); //render 'register' page
    }

    else if(req.params.page == 'file-test'){
      res.render('file-test');
    }

    else{
      res.render(file_rendered);
    }
  });

  router.use('/:page', function(req,res,next){
    res.render(req.params.page);
  });

  router.use('/', function(req,res,next){
    res.render('template');
  });

  return router;
};
