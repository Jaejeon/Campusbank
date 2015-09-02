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
var RegUser = require('./models/reg-user');
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
var parseFormdata = require('./parseFormdata');

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

app.post('/test/joinSubmit', function(req,res){
    parseFormdata(req,res);
    var newUser = regUserSave(req,res);
    joinEmailCheck(req,res,newUser);

    res.render('joinSubmit', {userEmail: newUser.email});
});

app.use('/test/test', function(req,res){
    res.render('joinSubmit', {userEmail: 'jaejeon@example.com'});
});

app.use('/test/:page', function(req,res){
  res.render(req.params.page);
});

app.use('/test', function(req,res){
  res.render('template');
});

/*
app.use(function(req,res,next){
    console.log(req.cookies.testCookie);
    res.cookie('testCookie', 'it is test cookie1', {maxAge: 900000000000, httpOnly:true});
    next();
});
*/
app.post('/login',
  passport.authenticate('local',
     {
         failureRedirect: '/login',
         failureFlash: true
     }),
  function(req,res){
    //if authorization is successful, this callback function will be called.
        res.redirect('/main');
    });

app.post('/join', function(req, res){
  var newUser = regUserSave(req,res);
  joinEmailCheck(req,res,newUser);
  res.render('emailCheck');
});

app.post('/emailAgain', function(req,res){
    var newUser = new RegUser({
       email: req.body.email
    });
    joinEmailCheck(req,res,newUser);
});

app.get('/logout', function(req,res){
  req.session.destroy();
  res.render('index');
});

//GET from email.
app.get('/emailCheck', function(req,res){
    emailCheckProcess(req,res);
});

app.get('/emailUsedCheck', function(req,res){
  emailUsedCheck(req,res);
});

app.use(function(req,res,next){
  //if user is logged in, variable 'isLoggedIn' is put to req.

  if(req.user){
    req.isLoggedIn = true;
    req.userName = req.user.username;
  }
  next();
});

app.use('/mypage', function(req,res,next){
    if(!req.user) res.render('notAllowed');
    else{
        res.render('mypage', {
            type: req.user.usertype,
            isLoggedIn: req.isLoggedIn,
            userName: req.userName,
            userBirth: req.user.birth,
            userEmail: req.user.email
        });
    }
});

app.use('/:type/:page', function(req,res,next){
  if(!req.user) res.render('login', {type: req.params.type});
  else res.render(req.params.type + '/' + req.params.page,
    {
        selected: req.params.page,
        type: req.params.type,
        isLoggedIn: req.isLoggedIn,
        userName: req.userName
    });
});

app.use('/:page', function(req,res,next){
  var type;
  if(req.params.page === 'main') type = 'loanee';
  else type = 'lender';
  res.render(req.params.page,
      {
        selected: req.params.page,
        type: type,
        isLoggedIn: req.isLoggedIn,
        userName: req.userName
      });
});

app.use('/', function(req,res,next){
    res.render('index');
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