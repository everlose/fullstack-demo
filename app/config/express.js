var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var process = require('process');

module.exports = function (app) {
    app.use(session({
        cookie: {
            maxAge: 1000 * 60 * 60
        },
        secret: "ukee",
        resave: false,
        saveUninitialized: true
    }));

    // view engine setup
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    app.use(favicon(path.join(__dirname, '../../views/assets', 'favicon.png')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cookieParser());

    //登录判断拦截
    // app.use('/app.html', function(req, res, next) {
    //     console.log(new Date(), utils.getClientIp(req), "Request:", req.originalUrl);
    //     var user = req.session.user;
    //     console.log(user);
    //     if (user && user.userName) {
    //         console.log(user);
    //         next();
    //         return;
    //     }
    //     res.redirect('/login.html');
    // });

    //开发环境则启动app.dev的中间件
    if (process.argv[2] && process.argv[2] === 'dev') {
        require('./express-dev.js')(app);
    }

    //静态资源服务器
    app.use(express.static(path.join(__dirname, '../../dist')));

    //node接口定义
    //app.use(require('../routes/login'));
    app.use(require('../routes'));

    //数据库开启
    //require('./mongoose')();
}

