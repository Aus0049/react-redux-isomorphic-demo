/**
 * Created by Aus on 2018/1/23.
 */
//实现缓存的 存取 功能 供调用
const client  = require('../config/redis_config');
const logger = require('../config/logger_config').getLogger('redis');

const get = (key) => {
    return new Promise(function (resolve, reject) {
        const startTime = new Date();

        client.get(key, (err, data) => {
            if (err) return reject(err);
            if (!data) return resolve();

            data = JSON.parse(data);

            const duration = (new Date() - startTime);

            logger.info('Cache', 'get', key, (duration + 'ms'));

            resolve(data);
        });
    });
};

// time 参数可选，秒为单位
const set = (key, value) => {
    return new Promise(function (resolve, reject) {
        const startTime = new Date();

        value = JSON.stringify(value);

        client.set(key, value, (err, data)=>{
            if (err) return reject(err);
            if (!data) return resolve();

            const duration = (new Date() - startTime);
            logger.info('Cache', 'set', key, (duration + 'ms'));

            resolve(data);
        });
    });
};

exports.get = get;
exports.set = set;