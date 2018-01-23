/**
 * Created by Aus on 2018/1/23.
 */
const config = require('./index');
const Redis = require('ioredis');
const logger = require('./logger_config').getLogger('redis');

const client = new Redis({
    port: config.redis_port,
    host: config.redis_host,
    db: config.redis_db,
    password: config.redis_password
});

client.on('error', function (err) {
    if (err) {
        logger.error('Redis链接失败！😢');
        logger.error(err);
        process.exit(1);
    }
});

module.exports = client;