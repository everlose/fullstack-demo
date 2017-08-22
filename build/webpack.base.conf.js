var webpack = require('webpack');
var path = require('path');
var HappyPack = require('happypack');
var os = require('os');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
var utils = require('./utils');
var config = require('../feconfig');
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
var vueLoaderConfig = require('./vue-loader.conf');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

let entry = utils.generateMultiEntry(config.multiPage);

function createHappyPlugin(id, loaders) {
    return new HappyPack({
        id: id,
        loaders: loaders,
        threadPool: happyThreadPool,
        // make happy more verbose with HAPPY_VERBOSE=1
        verbose: process.env.HAPPY_VERBOSE === '1'
    })
}

module.exports = {
    entry: entry,
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath :
            config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('views')
        }
    },
    module: {
        noParse: /node_modules\/(element-ui\.js)/,
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('views')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=happy-babel-js',
                exclude: /node_modules/,
                include: [resolve('views')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin({
            format: '  build [:bar] :percent (:elapsed seconds)'
        }),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '..'),
            manifest: require('./vendor-manifest.json')
        }),
        createHappyPlugin('happy-babel-js', ['babel-loader?cacheDirectory=true']),
        createHappyPlugin('happy-babel-vue', ['babel-loader?cacheDirectory=true']),
        createHappyPlugin('happy-css', ['css-loader', 'vue-style-loader']),
        // https://github.com/amireh/happypack/pull/131
        new HappyPack({
            loaders: [{
                path: 'vue-loader',
                query: {
                    loaders: {
                        less: 'vue-style-loader!css-loader!less-loader?indentedSyntax'
                    }
                }
            }]
        })
    ]
}
