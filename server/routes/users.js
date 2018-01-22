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
    Users.signUpUser(username, phone, password)
        .then(()=>{
            res.send(createResultObj(true, '注册成功!'));
        })
        .catch((errs)=>{
            res.send(createResultObj(false, '注册失败!', errs));
        });
});

// 公共方法
const createResultObj = (status = true, message = '', data = null) => ({
    status: status,
    message: message,
    data: data,
});

module.exports = router;
