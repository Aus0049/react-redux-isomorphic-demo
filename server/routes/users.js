const express = require('express');
const router = express.Router();
const {Users} = require('../proxy');
const logger = require('../config/logger_config').getLogger('route');

// users模块下的路径 路由表
// 注册
router.post('/sign-up', Users.signUpUser);

// 登录
router.post('/sign-in', Users.signInUser);

// 登出
router.post('/sign-in', Users.signOutUser);

module.exports = router;
