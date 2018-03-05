/**
 * Created by Aus on 2018/2/28.
 *
 * client的配置文件
 */
const path = require('path');

const config = {
    // 常规路径
    base_path: path.resolve(__dirname, '..'),
    src_path: path.join(__dirname, 'src'),
    components_path: path.resolve(__dirname, '../src/components'),
    public_path: path.join(__dirname, 'src', 'public'),
    style_path: path.resolve(__dirname, '../src/style/'),

    entry_path: path.resolve(__dirname, '../src/index.js'),
    entry_template_path: path.resolve(__dirname, '../index.html'),

    dist_path: path.resolve(__dirname, '../dist'),
    dist_asset_path: path.resolve(__dirname, '../dist/assets/'),
    assets_json_path: path.join(__dirname, '../'),

    client_server: 'localhost',
    client_port: 3000,

    server_address: 'localhost',
    server_port: 9000,

    // 一些变量
    env : process.env.NODE_ENV || 'development',
};

config.globals = {
    'process.env': {
        'NODE_ENV': JSON.stringify(config.env)
    },
    'NODE_ENV': config.env,
        '__DEV__': config.env === 'development',
        '__PROD__': config.env === 'production'
}
module.exports = config;
