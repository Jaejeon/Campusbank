var bodyParser = require('body-parser');
var RegUser = require('./models/reg-user');
var UserAuthnum = require('./models/user-authnum');
process.env.NODE_ENV = 'dev';
var config = require('config');
var randomstring = require('randomstring');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user: config.get('ADMIN_EMAIL'),
    pass: config.get('ADMIN_PASS')
  }
});

module.exports = function(req, res, newUser){

  var newUserAuthnum = new UserAuthnum({
    email: newUser.email,
    authnum: randomstring.generate(20),
    createdAt: new Date()
  });

  newUserAuthnum.save(function(err, newuserauthnum){
    if(err) return console.log(err);
  });

  transporter.sendMail({
    from: config.get('ADMIN_EMAIL'),
    to: newUser.email,
    subject: 'This is for email authentication by CAMPUS BANK',
    html: '<form action="http://localhost/emailcheck" method="get"><input type="text" name="authnum" value="'
    + newUserAuthnum.authnum + '" readonly="true" style="width:150px; font-color:#eb6000; height:25px; border:none; font-size:12px;">' +
    '<input type="submit" value="Click" style="width:50px; height: 25px; font-color:#002b57; font-weight:500; background-color:white; border: solid 2px #002b57; color:#002b57;"></form>'
  });

  res.render('email_check', {userEmail: newUser.email});
};