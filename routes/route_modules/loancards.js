/**
 * Created by ±¸ÀçÀü on 2015-11-20.
 */
var express = require('express');
var router = express.Router();


//************************3 depth url*****************************
router.put('/:loancard_id/lenders/:user_id', function(req,res,next){

});
router.delete('/:loancard_id/lenders/:user_id', function(req,res,next){

});
router.put('/:loancard_id/redemptions/:index', function(req,res,next){

});


//************************2 depth url*****************************
router.get('/:loancard_id/lenders', function(req,res,next){

});
router.get('/:loancard_id/redemptions', function(req,res,next){

});


//************************1 depth url*****************************
router.get('/:loancard_id', function(req,res,next){

});

router.get('/', function(req,res,next){

});

module.exports = router;