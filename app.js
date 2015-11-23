var express = require('express');
var connect = require('connect');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dbConfig = require('./db.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);
var lessMiddleware = require('less-middleware');
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');
var initPassport = require('./passport/init.js');
process.env.NODE_ENV = 'dev';
var config = require('config');
var fs = require('fs');
var MongoStore = require('connect-mongo')(expressSession);

var app = express();

var users = require('./routes/users.js')(app, passport);
var router_search = require('./routes/search.js');
var routes = require('./routes/index.js')();
var api_routes = require('./routes/api.js');
var auth_routes = require('./routes/auth.js')(app, passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({ //session stored in DB
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: config.get('SECRET_KEY'),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge : 24*60*1000 }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

initPassport(passport); // passport.js initializing

//-------------------- Routing START -----------------------------
app.use(function(req,res,next){
  if(req.user) console.log(req.cookies);
  res.cookie('connect-sid');
  next();
});

app.use('/auth', auth_routes);
app.use('/api', api_routes);

app.use('/users', users);
app.use('/search', router_search);
app.use('/', routes);
//-------------------- Routing END -------------------------------

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


