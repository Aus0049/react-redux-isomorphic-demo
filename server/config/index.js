/**
 * Created by Aus on 2018/3/5.
 */
const path = require('path');

const config = {
    debug: true,
    //域名
    host: 'localhost',
    // mongodb 配置
    db: 'mongodb://127.0.0.1:27017/circle_of_friends',

    // redis 配置，默认是本地
    redis_host: '127.0.0.1',
    redis_port: 6379,
    redis_db: 0,
    redis_password: '',

    session_secret: 'r_r_i_d', // react-redux-isomorphic-demo
    salt_factory: 10,

    upload: {
        path: path.join(__dirname, '../public/upload/'),
        url: '/public/upload/'
    },

    file_limit: '1MB',

    log_dir: path.join(__dirname, '../logs'),


};

module.exports = config;