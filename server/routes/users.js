const express = require('express');
const router = express.Router();
const {Users} = require('../proxy');

// users模块下的路径
// 注册
router.post('/sign-up', function (req, res, next) {
    // 注册
    const {username, phone, password} = req.body;
    // 用户名验重 手机号验重
    Users.signUpUser(username, phone, password)
        .then(()=>{
            // 写session
            req.session.user = {
                username,
                phone
            };
            res.send(createResultObj(true, '注册成功!'));
        })
        .catch((errs)=>{
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
            res.send(createResultObj(true, '登录成功!', {user: user}));
        })
        .catch((errs)=>{
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
