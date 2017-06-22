var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });
var bodyParser = require('body-parser');

var session = require('express-session');


var mysql      = require('mysql');  
var connection = mysql.createConnection({  
  host     : 'localhost',  
  user     : 'root',  
  password : '',  
  database : 'salon',
  dateStrings:true 
});  

var index = require('./routes/index');
var profile = require('./routes/profile_sp');
var booking = require('./routes/booking_sp');
var request = require('./routes/request_sp');
var transaction = require('./routes/transaction_sp');
var profileCustomer = require('./routes/view_profile_ho');
var search = require('./routes/search_ho');
var login = require('./routes/login_sp');
var successBooking = require('./routes/success_booking');
var successRequest = require('./routes/success_request');
var declinedRequest = require('./routes/declined_request');
var successAddService= require('./routes/success_addservice');
var logout = require('./routes/logout');
var send_feedback = require('./routes/send_feedback');
var gobackpage = require('./routes/gobackpage');
var remove_service = require('./routes/remove_service');

var app = express();

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'webtek',
    cookie: {
        maxAge: null
    },
    resave: false,
    saveUninitialized: true,
}));

app.use('/login', login);
app.use('/logout', logout);

// Authentication
app.use(function (req, res, next) {
    if (!req.session.email) {
        res.render('login_sp', {
            error: 'Please login!'
        });
    console.log("NO SESSION");
    } else {
        next();
    }
});

//Page routes
app.use('/', index); //home
app.use('/profile', profile); //profile
app.use('/booking', booking); //booking
app.use('/request', request); //request
app.use('/transactions', transaction); //request
app.use('/profileCustomer', profileCustomer);
app.use('/search', search);
app.use('/success_booking', successBooking);
app.use('/success_request', successRequest);
app.use('/declined_request', declinedRequest);
app.use('/success_addservice', successAddService);
app.use('/send_feedback', send_feedback);
app.use('/gobackpage', gobackpage);
app.use('/remove_service', remove_service);

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
