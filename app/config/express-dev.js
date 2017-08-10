var webpack = require('webpack');
var webpackConfig = require('../../build/webpack.dev.conf.js');

module.exports = function (app) {
    var compiler = webpack(webpackConfig);

    var devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: true
    })

    var hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: () => {},
        heartbeat: 2000
    })

    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({
                action: 'reload'
            })
            cb()
        })
    })

    app.use(devMiddleware)
    app.use(hotMiddleware)
};
