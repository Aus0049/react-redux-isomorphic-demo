/**
 * Created by Aus on 2018/1/25.
 */
const logger = require('../config/logger_config').getLogger('route');
const Redis = require('../common/cache');

// 检查登录状态
module.exports = function (req, res, next) {
    const urlWhiteList = [
        '/api/users/sign-in',
        '/api/users/sign-up'
    ];
    const url = req.originalUrl;
    logger.info('登录检查');
    logger.info(url);

    // 不在白名单里
    if(urlWhiteList.indexOf(url) === -1){
        // 检查redis中有没有这个值
        if(req.cookies && req.cookies.RRIDSID){
            // 根据sid 查找redis
            Redis.get(req.cookies.RRIDSID)
                .then((cache)=>{
                    logger.info('cache');
                    logger.info(cache);

                    if(cache){
                        // 更新redis时间
                        Redis.set(req.cookies.RRIDSID, cache, 60*60*24*1000);

                        logger.info('已登录');
                        next();
                        return;
                    }

                    logger.info('没有redis');
                    // 没有登录
                    res.send({
                        status: false,
                        code: 201,
                        message: '请先登录'
                    });
                });

            return;
        }

        logger.info('没有cookie');
        // 没有登录
        res.send({
            status: false,
            code: 201,
            message: '请先登录'
        });

        return;
    }

    // 在白名单里
    next();
};