var express = require('express');
var router = express.Router();
var router_form = require('./form.js');
var registerLoanCardProc = require('./js_module/registerLoanCardProc.js');

module.exports = function(){

  router.use('/invest/:page', function(req, res, next) {
    res.redirect('/invest#!/invest/' + req.params.page);
  });
  
  router.use('/invest', function(req, res, next) {
    res.render('invest');
  });
  
  //authentication
  router.use('/:type/:page', function(req,res,next){
    if(!req.user){
      res.render('login');
    }
    else{
      next();
    }
  });

  router.use('/form', router_form);

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
