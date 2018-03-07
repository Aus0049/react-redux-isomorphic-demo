/**
 * Created by Aus on 2018/2/28.
 *
 * 两套webpack配置 dev配置是本地开发时候的配置 也就是常规的webpack配置
 * 这里的webpack版本是2.6 ！！！
 */
const config = require('../config/');
const webpack = require('webpack');
// 自动将js混入html模板中的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 配置项
const webpackConfig = {
    devtool: 'source-map',
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
        chunkFilename: '[name]_[chunkhash:5].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: [
                    {loader: 'eslint-loader'}
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {loader: 'babel-loader'},
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'postcss-loader'},
                    {loader: 'sass-loader'}
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader'
            },
            {
                test: [/\.woff(\?.*)?$/, /\.woff2(\?.*)?$/, /\.otf(\?.*)?$/, /\.ttf(\?.*)?$/, /\.eot(\?.*)?$/, /\.swf(\?.*)?$/],
                loader: 'url-loader'
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: config.entry_template_path,
            inject: 'body',
            // favicon: paths.client('static/favicon.ico'),
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            },
            chunks: [
                'app', 'vendor'
            ],
            filename: 'index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            filename: 'assets/js/[name]_[hash].js'
        }),
        new webpack.DefinePlugin(config.globals),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = webpackConfig;
