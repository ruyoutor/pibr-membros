var express       = require('express');
var path          = require('path');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var load          = require('express-load');
var session       = require('express-session');
var passport      = require('passport');
var flash         = require('connect-flash');


var env       = process.env.NODE_ENV || 'development';

var models        = require('./models')
var config        = require('./config/config.json')[env];
var initPassport  = require('./config/passport/init');


var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	saveUninitialized: true,
	resave: true,
  secret: config.sessionSecret
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.models = models;
app.passport = passport;
initPassport(passport);

load('controllers').then('routes').into(app);


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
