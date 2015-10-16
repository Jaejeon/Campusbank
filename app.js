var express = require('express');
var connect = require('connect');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dbConfig = require('./db.js');
var mongoose = require('mongoose');
var User = require('./models/user');
var LoanCard = require('./models/loan-card');
mongoose.connect(dbConfig.url);
var routes = require('./routes/index');
var users = require('./routes/users');
var passport = require('passport'),
    LocalStrategy = require('passport-local');
var expressSession = require('express-session');
var flash = require('connect-flash');
process.env.NODE_ENV = 'dev';
var config = require('config');
var joinEmailCheck = require('./joinEmailCheck'); // join process module
var emailCheckProcess = require('./emailCheckProcess'); // email check process module
var regUserSave = require('./regUserSave'); // registration of User who is waiting for authentication
var emailUsedCheck = require('./emailUsedCheck'); // Email Used Check when user fill out the input of email
var parseFormdata = require('./parseFormdata'); // parse Form data (POST method)
var interLoanCardProc = require('./interLoanCardProc'); // for 'register' page, loan card rendering process
var userAuthNumSave = require('./userAuthNumSave');
var searchSchool = require('./searchSchool'); // search school process
var searchDepart = require('./searchDepart'); // search depart process
var searchMajor = require('./searchMajor'); // search major process

passport.serializeUser(function(user, done){
  console.log('Serialize is called');
  //in done(null, THIS), "THIS" is the data saved in session
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  //in function(id,done) above this comment, "id" is what saved in the session.
  console.log('Deserialize is called');
  User.findOne({_id: id}, function(err, user){
    done(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
    //Verify callback
    function(email, password, done){
      User.findOne({email: email}, function(err, user){
        //"user" in "function(err,user) is the object gotten by User.findOne()
        if(err) {return done(err);} //if an exception occurred while verifying the credentials, done(err)
        if(!user){
          return done(null, false, { message: 'Incorrect username'});
        }
        //if credential are not valid, done should be invoked with false
        //An additional info message can be supplied to indicate the reason for the failure.
        //The message is useful for displaying a flash message
        if(user.password != password){
          return done(null, false, { message: 'Incorrect password'});
        }

        return done(null, user); //valid credentials
      });
    }
));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret: config.get('SECRET_KEY'),
                        resave: false,
                        saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', function(req,res,next){

    /* Because "SerializeArray" method does not transfer the post data in form req.body.---,
    *   1. parse the data using parseFormdata(req,res)
    *   2. put them in that form req.body.email & req.body.password (passport.js validates user in that form)
    */
    parseFormdata(req,res);
    req.body.email = req.postVal[0];
    req.body.password = req.postVal[1];
    next();
});

app.post('/login',
    passport.authenticate('local',
        {
            successRedirect:'/loginSuccess',
            failureRedirect:'/loginFail',
            failureFlash: true
        })
);

app.post('/joinSubmit', function(req,res){
    parseFormdata(req,res);
    var newUser = regUserSave(req,res);
    var userAuthNum = userAuthNumSave(req,res, newUser);

    app.render('emailAuthContent', {userAuthNum: userAuthNum.authnum}, function(err,html){
        joinEmailCheck(req,res,newUser,html);
    });

    res.render('joinSubmit', {userEmail: newUser.email});
});

app.post('/emailAuth', function(req,res){
    emailCheckProcess(req,res);
});

app.get('/search-school/:category', function(req,res){
    if(req.params.category == 'school') searchSchool(req, res);
    else if(req.params.category == 'depart') searchDepart(req,res);
    else if(req.params.category == 'major') searchMajor(req,res);
});

app.get('/search-school', function(req,res){
    res.render('search-school');
});

app.get('/loginSuccess', function(req,res){
    res.set('isLoggedIn', 'true');
    res.set('username', req.user.username);
    res.render('loginSuccess', {username: req.user.username});
});

app.get('/loginFail', function(req,res){
    res.render('loginFail');
});

app.use('/mypage', function(req,res){
    res.render('mypage');
});

app.use('/test', function(req,res){
/*
    var newUser = new User({
        email: 'testuser2@redrocket.co.kr',
        password: 'testpassword',
        birth: new Date('2015-09-25'),
        usertype: 'loan',
        username: 'TEST10',
        loan:{
            sex: 'male', //male, female
            military: true, //military service true, false
            status: 'graduate', // graduate, inSchool, LOA (leave of absence)
            credit: 'B0',
            income:{
                exist: true, // income exist, or not
                jobType: 'temporary', // regular, temporary
                amount: 800  // amount of income
            },
            address:{
                newSystem: 'TEST-TEST', // Road Name Address
                oldSystem: 'TEST-TEST', // parcel address
                zipCode: '150-989'
            },
            eduInfo:{
                school: '연세대학교', // korea, yousei, seoul, ...
                major: '컴퓨터학과', // business management, computer science, ...
                admissionYear: 2010, // 2010, 2011, 2012, ...
                completeTerm: 6, // 2, 3, 4, ...
                gpa: 3.5, // 3.3, 4.1, ...
                gpaMax: 4.5 // 4.3, 4.5
            },
            loanInfo:{
                exist: true, // loan history existence
                                // true, false
                amount: 1000 // 1000, 1500, ...
            }
        }
    });

    newUser.save();
*/

    res.render('renderTest');
});

app.use('/:type/:page', function(req,res){
    if(req.params.page === 'register'){
        interLoanCardProc(req,res); //render 'register' page
    }

    else{
        res.render(req.params.page);
    }

});

app.use('/', function(req,res){
  res.render('template');
});

/*
app.use(function(req,res,next){
    console.log(req.cookies.testCookie);
    res.cookie('testCookie', 'it is test cookie1', {maxAge: 900000000000, httpOnly:true});
    next();
});
*/

app.get('/logout', function(req,res){
  req.session.destroy();
  res.render('index');
});

//GET from email.

app.get('/emailUsedCheck', function(req,res){
  emailUsedCheck(req,res);
});

app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.locals.pretty = true;
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;


