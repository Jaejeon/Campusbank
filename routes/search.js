var express = require('express');
var router = express.Router();
var searchSchool = require('./js_module/searchSchool.js');
var searchDepart = require('./js_module/searchDepart.js');
var searchMajor = require('./js_module/searchMajor.js');
var emailUsedCheck = require('./js_module/emailUsedCheck.js');

//search-school process
router.get('/:category', function(req,res){
  if(req.params.category == 'search-school') res.render('search-school');
  else if(req.params.category == 'school') searchSchool(req,res);
  else if(req.params.category == 'depart') searchDepart(req,res);
  else if(req.params.category == 'major') searchMajor(req,res);
});

router.get('/emailUsedCheck', function(req,res){
  emailUsedCheck(req,res);
});

router.get('/logout', function(req,res){
  req.session.destroy();
  res.render('index');
});

router.get('/mypage', function(req,res){

});

module.exports = router;
