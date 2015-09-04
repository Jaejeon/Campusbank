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

module.exports = function(req, res, newUser, emailAuthContent){

  transporter.sendMail({
    from: config.get('ADMIN_EMAIL'),
    to: newUser.email,
    subject: 'This is for email authentication by CAMPUS BANK',
    html: emailAuthContent
  });
};