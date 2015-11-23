var express = require('express');
var router = express.Router();
var regUserSave = require('./js_module/regUserSave.js');
var userAuthNumSave = require('./js_module/userAuthNumSave.js');
var sendAuthEmail = require('./js_module/sendAuthEmail.js');
var emailCheckProcess = require('./js_module/emailCheckProcess.js');

module.exports = function(app, passport){

  //-----------------LOGIN routing START--------------------
  router.post('/login', passport.authenticate('local',
    {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    }));
  //-----------------LOGIN routing END----------------------


  //-----------------JOIN routing START---------------------
  router.post('/join', function(req,res,next){
    var newUser = regUserSave(req,res);
    var userAuthNum = userAuthNumSave(req,res,newUser);

    app.render('emailAuthContent', {userAuthNum: userAuthNum.authnum}, function(err,html){
      sendAuthEmail(req,res,newUser,html);
    });

    res.render('joinSubmit', {userEmail : newUser.email});
  });
  //-----------------JOIN routing END-----------------------

  //-----------------EMAIL AUTHENTICATION routing START-----
  router.post('/email', function(req,res,next){
    emailCheckProcess(req,res);
  });
  //-----------------EMAIL AUTHENTICATION routing END-------

  return router;
};