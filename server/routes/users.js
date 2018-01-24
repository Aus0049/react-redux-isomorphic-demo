const express = require('express');
const router = express.Router();
const {Users} = require('../proxy');
const logger = require('../config/logger_config').getLogger('route');
const Redis = require('../common/cache');
const Secret = require('../common/secret');

// users模块下的路径
// 注册
router.post('/sign-up', function (req, res, next) {
    logger.info('注册接口调用');
    // 注册
    const {username, phone, password} = req.body;
    // 用户名验重 手机号验重
    Users.signUpUser(username, phone, password)
        .then((user)=>{
            // 写redis
            logger.info('routes');
            const sessionId = Secret.getSessionId(user._id.toString());
            logger.info(sessionId);
            const userInfo = {
                userId: user._id,
                username: user.username,
                phone: user.phone
            };

            Redis.set(sessionId, userInfo);

            // 打log
            logger.info(`注册成功：${username} ${phone}`);
            res.send(createResultObj(true, '注册成功!', userInfo));
        })
        .catch((errs)=>{
            logger.info(`注册失败：${username} ${phone}`);
            logger.info(errs);
            res.send(createResultObj(false, '注册失败!', errs));
        });
});

// 登录
router.post('/sign-in', function (req, res, next) {
    // 注册
    const {username, password} = req.body;
    // 用户名验重 手机号验重
    Users.signInUser(username, password)
        .then((user)=>{
            // 写session
            req.session.user = {
                username,
                phone: user.phone
            };
            logger.info(`登录成功：${username}`);
            res.send(createResultObj(true, '登录成功!', {user: user}));
        })
        .catch((errs)=>{
            logger.info(`登录失败：${username}`);
            res.send(createResultObj(false, '登录失败!', errs));
        });
});

// 公共方法
const createResultObj = (status = true, message = '', data = null) => ({
    status: status,
    message: message,
    data: data,
});

module.exports = router;
