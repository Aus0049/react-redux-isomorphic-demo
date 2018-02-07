/**
 * Created by Aus on 2018/2/2.
 */
//加载Node的Path模块
const path = require('path');
const config = require('../config/client');
//加载webpack模块
const webpack = require('webpack');
//加载自动化HTML自动化编译插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

const webpackConfig = {
    devtool: 'source-map',
    entry: {
        app: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://0.0.0.0:${config.client_port}`,
            'webpack/hot/only-dev-server',
            config.entry_path // 入口文件
        ],
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'react-router',
            'axios'
        ],
        output: {
            path: config.dist_path,
            filename: `${config.dist_js_path}[name].js`,
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include: [config.style_path],
                    use: [
                        {loader: 'style-loader'},
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                camelCase: true,
                                localIdentName: '[name]_[local]_[hash:base64:3]',
                                importLoaders: 1,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: () => [
                                    precss(),
                                    autoprefixer({
                                        browsers: ['last 3 version', 'ie >= 10']
                                    })
                                ]
                            }
                        },
                        {
                            test: /\.js$/,
                            exclude: /node_modules/,
                            use: [
                                {
                                    loader: 'babel-loader',
                                }
                            ]
                        },
                        {
                            test: /\.(png|jpeg|jpg|gif|svg)$/,
                            use: [
                                {
                                    loader: 'file-loader',
                                    options: {
                                        name: `${config.dist_asset_path}/[name].[ext]`
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: config.entry_template_path,
                inject: true,
                hash: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: false
                },
                chunks: [
                    'index', 'vendor'
                ],
                filename: 'index.html'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: [
                    'vendor'
                ],
                filename: `${config.dist_js_path}/[name]_[hash:base64:3].js`
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ]
    }
};

module.exports = webpackConfig;