/**
 * Created by Aus on 2018/3/1.
 */
const express = require('express');
const debug = require('debug')('app:server');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../build/webpack.config.dev');
const config = require('../config');

// const app = express();

// app.use(require('connect-history-api-fallback')());

const compiler = webpack(webpackConfig);

debug('Enable webpack dev and HMR middleware');

const server = new WebpackDevServer(compiler, {
    hot: true,
    // filename: 'bundle.js',
    headers: {"Access-Control-Allow-Origin": "*"},
    publicPath: '/',
    contentBase: config.dist_path,
    stats: {
        chunks: false,
        chunkModules: false,
        colors: true
    },
    historyApiFallback: true,
    proxy: {
        '/api/*': {
            target: `http://${config.server_address}:${config.server_port}`,
            secure: false,
        }
    }
});

server.listen(config.client_port, 'localhost', () => {
    console.log(`Server is now running at http://localhost:${config.client_port}.`);
});

// app.use();

// app.use(require('webpack-hot-middleware')(compiler));
//
// // Serve static assets from ~/src/static since Webpack is unaware of
// // these files. This middleware doesn't need to be enabled outside
// // of development since this directory will be copied into ~/dist
// // when the application is compiled.
// app.use(express.static(config.public_path));
//
// app.listen(config.client_port, ()=>{
//     debug(`Server is now running at http://localhost:${port}.`);
// });