var async = require('async');
var User = require('./../../models/user');
var RegUser = require('./../../models/reg-user');
var UserAuthnum = require('./../../models/user-authnum');

module.exports = function(req,res){
    async.apply(UserAuthnum.findOne, req, res);
    async.waterfall([
        function(callback){
            UserAuthnum.findOne({authnum: req.body.authnum}, function(err,user){
                //database connecting error
                if(err) return callback(new Error('failed connecting to database: '+err.message), 'errCode1');

                //authentication period expired
                if(!user) return callback(new Error('Authentication period is expired'), 'errCode2');

                //user exists, not correct authnum
                if(user.authnum !== req.body.authnum) return callback(new Error('Not appropriate access to authentication', 'errCode3'));
                callback(null, user);
            });
        },
        function(isAuthorized, callback){
            RegUser.findOne({email: isAuthorized.email}, function(err,user){
                if(err) return callback(new Error('failed connecting to database: '+err.message), 'errCode4');

                //authnum exists in the database, but regUser not exists (already authenticated)
                if(!user) return callback(new Error('already be authenticated'), 'errCode5');
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

                    return res.json({ success: true, message: null, data:{ usertype: userAuth.usertype }});
                });
            }
        }
    ], function(err, errCode, result){
        var errmsg = '';
        if(errCode == 'errCode1') errmsg = 'Failed connecting to database';
        else if(errCode =='errCode2') errmsg = 'Authentication period is expired';
        else if(errCode =='errCode3') errmsg = 'Not appropriate access to authentication';
        else if(errCode =='errCode4') errmsg = 'Failed connecting to database';
        else if(errCode =='errCode5') errmsg = 'Already be authenticated';

        return res.json({ success: false, message: errmsg});
    });
};