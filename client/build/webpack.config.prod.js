/**
 * Created by Aus on 2018/3/1.
 *
 * prod配置，也就是同构时候的webpack配置
 * 与dev配置不同的是：
 * 1. prod时候的代码需要压缩
 * 2. js不再使用插件混淆到html中
 * 3. css文件合并压缩
 * 4. 生成webpack.assets.json文件
 */
const config = require('../config/');
const webpack = require('webpack');
// 合并css文件的插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 同构处理静态资源的插件
const webpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPluginIns =
    new webpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration')).development();

// 配置项
const webpackConfig = {
    devtool: 'source-map', // source-map还是需要保留 处理一些bug时候需要源码
    entry: {
        app: [
            config.entry_path // 入口文件
        ],
        vendor: [
            // 公共文件包
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'react-router',
            'axios'
        ]
    },
    output: {
        path: config.dist_path,
        filename: 'assets/js/[name]_[hash].js',
        publicPath: '/', // 按需加载和额外资源路径
        // 添加 chunkFilename
        chunkFilename: 'assets/js/[name]_[chunkhash:5].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {loader: 'babel-loader'}
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {loader: 'css-loader'},
                        {loader: 'postcss-loader'},
                        {loader: 'sass-loader'}
                    ]
                })
            },
            {
                test: webpackIsomorphicToolsPluginIns.regular_expression('images'),
                loader: 'url-loader?limit=8192', // 这样在小于8K的图片将直接以base64的形式内联在代码中，可以减少一次http请求。
                options: {
                    name: 'assets/images/[name]_[hash:8].[ext]'
                }
            },
            {
                test: webpackIsomorphicToolsPluginIns.regular_expression('fonts'),
                loader: 'url-loader',
                options: {
                    name: 'assets/fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        webpackIsomorphicToolsPluginIns,
        new ExtractTextPlugin({
            filename: 'assets/css/[name]_[hash].css',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: 'Infinity',
            names: ['vendor'],
            filename: 'assets/js/[name]_[hash].js'
        }),
        new webpack.DefinePlugin(config.globals),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                unused: true,
                dead_code: true,
                warnings: false
                // drop_console: true, // 线上去掉console
            }
        })
    ]
};

module.exports = webpackConfig;