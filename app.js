var express = require('express');
var app = express();

require('./app/config/express.js')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.log('err msg', err.message)
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({
        code: err.status || 500,
        success: false,
        data: null,
        msg: 'server error'
    });
});

module.exports = app;

