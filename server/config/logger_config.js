/**
 * Created by Aus on 2018/1/23.
 */
const log4js = require('log4js');
const path = require('path');
const config = require('./index');

log4js.configure({
    appenders: {
        default: { type: 'console'},
        redis: {
            type: 'file',
            filename: path.join(config.log_dir, 'redis', 'redis.log'),
            alwaysIncludePattern: true
        },
        mongo: {
            type: 'file',
            filename: path.join(config.log_dir, 'mongo', 'mongo.log'),
            alwaysIncludePattern: true
        },
        route: {
            type: 'file',
            filename: path.join(config.log_dir, 'route', 'request.log'),
            maxLogSize: 1024,
            backups: 3,
        }
    },
    replaceConsole: true,
    categories: {
        default: { appenders: ['default'], level: 'info' },
        database: { appenders: ['redis', 'mongo'], level: 'error'},
        server: { appenders: ['default'], level: 'error' },
        controller: { appenders: ['route'], level: 'info' }
    }
});

module.exports = log4js;