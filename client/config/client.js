/**
 * Created by Aus on 2018/2/7.
 */
// client的配置文件
const path = require('path');
const debug = require('debug')('app:config-client');

debug('Creating default configuration.');

const config = {
    //
    base_path: path.resolve(__dirname, '..'),
    src_path: path.resolve(__dirname, '../src/'),
    components_path: path.resolve(__dirname, '../src/components'),
    public_path: path.resolve(__dirname, '../src/public'),
    style_path: path.resolve(__dirname, '../src/style/'),

    entry_path: path.resolve(__dirname, '../src/index.js'),
    entry_template_path: path.resolve(__dirname, '../src/index.html'),

    dist_path: path.resolve(__dirname, '../dist'),
    dist_js_path: path.resolve(__dirname, '../dist/js'),
    dist_asset_path: path.resolve(__dirname, '../dist/asset'),
    dist_style_path: path.resolve(__dirname, '../dist/style'),

    client_server: 'localhost',
    client_port: 3000,

};
