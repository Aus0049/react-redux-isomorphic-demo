/**
 * Created by Aus on 2018/1/16.
 */
const express = require('express')
const debug = require('debug')('app:server')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')
const proxy = require('http-proxy-middleware')

const app = express()
const paths = config.utils_paths

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
    const compiler = webpack(webpackConfig);

    debug('Enable webpack dev and HMR middleware');
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        contentBase: paths.client(),
        hot: true,
        quiet: config.compiler_quiet,
        noInfo: config.compiler_quiet,
        lazy: false,
        stats: config.compiler_stats,
    }));

    app.use(require('webpack-hot-middleware')(compiler));

    app.use(express['static'](paths.client('static')));

    // context可以是单个字符串，也可以是多个字符串数组，分别对应你需要代理的api,星号（*）表示匹配当前路径下面的所有api
    const context = [`/api/*`];

    // options可选的配置参数请自行看readme.md文档，通常只需要配置target，也就是你的api所属的域名。
    const options = {
        target: 'http://localhost:9000/',
        changeOrigin: true
    };

    // 将options对象用proxy封装起来，作为参数传递
    const apiProxy = proxy(options);

    // 现在你只需要执行这一行代码，当你访问需要跨域的api资源时，就可以成功访问到了。
    app.use(context, apiProxy);

    app.use('*', (req, res, next) => {
        const filename = path.join(compiler.outputPath, 'index.html')
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                return next(err)
            }
            res.set('content-type', 'text/html')
            res.send(result)
            res.end()
        })
    });
} else {
    debug(
        'Server is being run outside of live development mode, meaning it will ' +
        'only serve the compiled application bundle in ~/dist. Generally you ' +
        'do not need an application server for this and can instead use a web ' +
        'server such as nginx to serve your static files. See the "deployment" ' +
        'section in the README for more information on deployment strategies.'
    )

    // Serving ~/dist by default. Ideally these files should be served by
    // the web server and not the app server, but this helps to demo the
    // server in production.
    app.use(express['static'](paths.dist()))
}

module.exports = app;