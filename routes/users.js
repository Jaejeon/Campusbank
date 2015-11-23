var express = require('express');
var router = express.Router();
var parseFormdata = require('./js_module/parseFormdata.js');
var regUserSave = require('./js_module/regUserSave.js');
var userAuthNumSave = require('./js_module/userAuthNumSave.js');
var sendAuthEmail = require('./js_module/sendAuthEmail.js');
var emailCheckProcess = require('./js_module/emailCheckProcess.js');

module.exports = function(app, passport){

//-------------------LOGIN routing START-------------------------
  router.post('/login', function(req,res,next){
    parseFormdata(req,res);
    req.body.email = req.postVal[0];
    req.body.password = req.postVal[1];
    next();
  });

  router.post('/login', passport.authenticate('local',
    {
      successRedirect: '/users/login/loginSuccess',
      failureRedirect: '/login',
      failureFlash: true
    }));

  router.get('/login/:page', function(req,res,next){
    res.send('Hello World!');
    //res.render(req.params.page, {username: req.user.username});
  });
//-------------------LOGIN routing END-------------------------


//-------------------JOIN routing START-------------------------
  router.post('/joinSubmit', function(req,res){
    parseFormdata(req,res);
    var newUser = regUserSave(req,res);
    var userAuthNum = userAuthNumSave(req,res,newUser);

    app.render('emailAuthContent', {userAuthNum: userAuthNum.authnum}, function(err,html){
      sendAuthEmail(req,res,newUser,html);
    });

    res.render('joinSubmit', {userEmail: newUser.email});
  });

  router.post('/emailAuth', function(req,res){
    emailCheckProcess(req,res);
  });
//-------------------JOIN routing END-------------------------
  return router;
};