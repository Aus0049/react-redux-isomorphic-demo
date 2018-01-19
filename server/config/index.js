/**
 * Created by Aus on 2018/1/19.
 */
const path = require('path');

const config = {
    debug: true,
    //域名
    host: 'localhost',
    // mongodb 配置
    db: 'mongodb://127.0.0.1:27017/circle_of_friends',

    upload: {
        path: path.join(__dirname, 'public/upload/'),
        url: '/public/upload/'
    },
    file_limit: '1MB',
};

module.exports = config;