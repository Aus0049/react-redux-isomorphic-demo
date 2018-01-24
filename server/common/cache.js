/**
 * Created by Aus on 2018/1/23.
 */
//实现缓存的 存取 功能 供调用
const redis  = require('../config/redis_config');
const _      = require('lodash');
const logger = require('../config/logger_config').getLogger('redis');

const get = (key) => {
    return new Promise(function (resolve) {
        const t = new Date();

        redis.get(key, (err, data) => {
            if (err) return callback(err);
            if (!data) return callback();

            data = JSON.parse(data);

            const duration = (new Date() - t);

            logger.info('Cache', 'get', key, (duration + 'ms'));

            resolve(data);
        });
    });
};

exports.get = get;

// time 参数可选，秒为单位
const set = (key, value, time, callback) => {
    const t = new Date();

    if (typeof time === 'function') {
        callback = time;
        time = null;
    }
    callback = callback || _.noop;
    value = JSON.stringify(value);

    if (!time) {
        redis.set(key, value, callback);
    } else {
        redis.setex(key, time, value, callback);
    }
    const duration = (new Date() - t);
    logger.info('Cache', 'set', key, (duration + 'ms'));
};

exports.set = set;