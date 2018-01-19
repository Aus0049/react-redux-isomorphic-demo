/**
 * Created by Aus on 2018/1/18.
 */
const mongoose = require('mongoose');
const logger   = require('../common/logger');
const config = require('../config/index');

if (config.debug) {
    var traceMQuery = function (method, info, query) {
        return function (err, result, millis) {
            if (err) {
                logger.error('traceMQuery error:', err)
            }
            var infos = [];
            infos.push(query._collection.collection.name + "." + method.blue);
            infos.push(JSON.stringify(info));
            infos.push((millis + 'ms').green);

            logger.debug("MONGO".magenta, infos.join(' '));
        };
    };

    mongoose.Mongoose.prototype.mquery.setGlobalTraceFunction(traceMQuery);
}
