const express = require('express');
const router = express.Router();
const {Users} = require('../proxy');

// users模块下的路径
router.get('/', function (req, res, next) {
    res.send('查看自己');
});

// 注册
router.post('/sign-up', function (req, res, next) {
    // 注册
    const {username, phone, password} = req.body;
    // 用户名验重 手机号验重
    const result = Users.signUpUser(username, phone, password);
    console.log(1111);
    console.log(result);
    res.send(result);
});

module.exports = router;
