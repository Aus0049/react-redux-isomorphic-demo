const express = require('express');
const router = express.Router();
const {Users} = require('../proxy');
const logger = require('../config/logger_config').getLogger('route');

// users模块下的路径
// 注册
router.post('/sign-up', function (req, res, next) {
    // 注册
    const {username, phone, password} = req.body;
    // 业务逻辑
    Users.signUpUser(username, phone, password, res)
        .then((userInfo)=>{
            logger.info('注册成功');
            res.send(createResultObj(true, '注册成功！', userInfo));
        })
        .catch((err)=>{
            // 返回结果
            logger.info('注册失败');
            logger.info(err);
            res.send(createResultObj(false, err.message));
        });
});

// 登录
router.post('/sign-in', function (req, res, next) {
    // 注册
    const {username, password} = req.body;
    // 用户名验重 手机号验重
    Users.signInUser(username, password, res)
        .then((userInfo)=>{
            logger.info('登录成功');
            res.send(createResultObj(true, '登录成功！', userInfo));
        })
        .catch((err)=>{
            // 返回结果
            logger.info('登录');
            logger.info(err);
            res.send(createResultObj(false, err.message));
        });
});

// 登出
router.post('/sign-out', function (req, res, next) {
    // 从cookie中找到sessionId
    const sid = req.cookies.RRIDSID;
    // 用户名验重 手机号验重
    Users.signOutUser(sid)
        .then(()=>{
            logger.info('登出成功');
            res.send(createResultObj(true, '登录成功！'));
        })
        .catch((err)=>{
            // 返回结果
            logger.info('登录失败');
            logger.info(err);
            res.send(createResultObj(false, err.message));
        });
});


const createResultObj = (status = true, message = '', data = null) => ({
    status: status,
    message: message,
    data: data,
});

module.exports = router;
