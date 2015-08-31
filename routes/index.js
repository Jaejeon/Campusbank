var express = require('express');
var router = express.Router();

var isLoggedIn;

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Ä·ÆÛ½º¹ðÅ©'});
});

router.get('/main', function(req,res,next){
    res.render('index_loanee', {selected: 'index_loanee'})
});

router.get('/main_', function(req,res,next){
    res.render('index_lender', {selected: 'index_lender'})
});

router.get('/login', function(req, res, next){
    res.render('login');
});

router.get('/join', function(req, res, next){
   res.render('join');
});
/*------------------loanee routing start---------------------*/

router.get('/loanee/credit', function(req, res, next){
  res.render('loanee/credit_loanee', {selected: 'credit_loanee'});
});

router.get('/loanee/register', function(req, res, next){
  res.render('loanee/new_register_loanee', {selected: 'new_register_loanee'});
});

router.get('/loanee/ing', function(req, res, next){
   res.render('loanee/ing_loanee', {selected: 'ing_loanee'});
});

router.get('/loanee/ed', function(req, res, next){
  res.render('loanee/ed_loanee', {selected: 'ed_loanee'});
});

router.get('/loanee/payback', function(req, res, next){
  res.render('loanee/payback_loanee', {selected: 'payback_loanee'});
});
/*------------------loanee routing end---------------------*/



/*------------------lender routing start----------------------*/

router.get('/lender/profile', function(req, res, next){
  res.render('lender/profile_lender', {selected: 'profile_lender'});
});

router.get('/lender/ava', function(req, res, next){
  res.render('lender/ava_product_lender', {selected: 'ava_product_lender'});
});

router.get('/lender/cart', function(req, res, next){
  res.render('lender/cart_lender', {selected: 'cart_lender'});
});

router.get('/lender/comp', function(req, res, next){
  res.render('lender/comp_product_lender', {selected: 'comp_product_lender'});
});

router.get('/lender/profit', function(req, res, next){
  res.render('lender/profit_lender', {selected: 'profit_lender'});
});
/*------------------lender routing end----------------------*/

module.exports = router;
