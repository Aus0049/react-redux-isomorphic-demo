/**
 * Created by Aus on 2018/1/23.
 */
const log4js = require('log4js');
const path = require('path');
const config = require('../../config');

log4js.configure({
    appenders: {
        default: { type: 'console'},
        mongo: {
            type: 'file',
            filename: path.join(config.log_dir, 'mongo', 'mongo.log'),
            alwaysIncludePattern: true
        },
        user: {
            type: 'file',
            filename: path.join(config.log_dir, 'proxy', 'user.log'),
            maxLogSize: 1024,
            backups: 3,
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
        database: { appenders: ['mongo'], level: 'error'},
        server: { appenders: ['user'], level: 'error' },
        controller: { appenders: ['route'], level: 'info' }
    }
});

module.exports = log4js;