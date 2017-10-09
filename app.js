var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
var cons = require('consolidate');

var index = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var admin = require('./routes/admin');
var speakers = require('./routes/speakers');
var deletespeaker = require('./routes/deletespeaker');
var speakerinsert = require('./routes/speakerinsert');
var videos = require('./routes/videos');
var deletevideo = require('./routes/deletevideo');

const config = require('./config');
const con = mysql.createConnection(config.MYSQL);
con.connect(function(err){
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
var app = express();
const sess = {
    secret: 'awhdRkRSKSLSIEHGugdYdfd'
};

// view engine setup
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/admin', admin);
app.use('/speakers', speakers);
app.use('/delete-speaker', deletespeaker);
app.use('/speaker-insert', speakerinsert);
app.use('/videos', videos);
app.use('/delete-video', deletevideo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;