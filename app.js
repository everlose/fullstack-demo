var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var process = require('process');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(require('connect-history-api-fallback')());

//开发环境则启动app.dev的中间件
if (process.argv[2] && process.argv[2] === 'dev') {
    require('./app.dev.js')(app);
}

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vue');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'views/assets', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', index);
app.use('/users', users);

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
  res.end('error');
});

module.exports = app;
