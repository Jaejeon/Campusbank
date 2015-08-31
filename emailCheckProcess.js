var async = require('async');
var User = require('./models/user');
var RegUser = require('./models/reg-user');
var UserAuthnum = require('./models/user-authnum');
var randomstring = require('randomstring');

module.exports = function(req,res){

    async.apply(UserAuthnum.findOne, req, res);
    async.waterfall([
        function(callback){
            UserAuthnum.findOne({authnum: req.query.authnum}, function(err,user){
                if(err) return callback(new Error('failed connecting to database: '+err.message), 'errCode1');
                if(!user) return callback(new Error('Authentication period is expired'), 'errCode2');
                if(user.authnum !== req.query.authnum) return callback(new Error('Not appropriate access to authentication', 'errCode3'));
                callback(null, user);
            });
        },
        function(isAuthorized, callback){
            RegUser.findOne({email: isAuthorized.email}, function(err,user){
                if(err) return callback(new Error('failed connecting to database: '+err.message), 'errCode4');
                if(!user) return callback(new Error('You may already be authenticated'), 'errCode5');
                callback(null, user);
            });
        },
        function(authorizedUser, callback){
            console.log("authorizedUser: "+authorizedUser);
            if(authorizedUser){
                var userAuth = new User;
                userAuth.email = authorizedUser.email;
                userAuth.password = authorizedUser.password;
                userAuth.birth = authorizedUser.birth;
                userAuth.username = authorizedUser.username;
                userAuth.usertype = authorizedUser.usertype;

                RegUser.remove({_id: authorizedUser._id}, function(err){
                    if(err) console.log(err);
                });

                userAuth.save(function(err,userauth){
                    if(err) callback(err);
                    userAuth.dbSuccess();
                    if(userAuth.usertype == 'loan') return res.render('main');
                    else return res.render('main_');
                });
            }
        }
    ], function(err, errCode, result){
        console.log(err);
        if(errCode == 'errCode1'){return res.render('emailCheckLogin', {authError1: 'true'});}
        if(errCode == 'errCode2'){return res.render('emailCheckLogin', {authError2: 'true'});}
        if(errCode == 'errCode3'){return res.render('emailCheckLogin', {authError3: 'true'});}
        if(errCode == 'errCode4'){return res.render('emailCheckLogin', {authError4: 'true'});}
        if(errCode == 'errCode5'){return res.render('login', {authError5: 'true'});}

    });
};