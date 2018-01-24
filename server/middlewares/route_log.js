/**
 * Created by Aus on 2018/1/24.
 */
const logger = require('../config/logger_config').getLogger('route');
// 打印路由中间件
module.exports = function (req, res, next) {
    logger.info(`url：${req.originalUrl} start`);
    next();
    logger.info(`url：${req.originalUrl} end`);
};