/**
 * Created by Aus on 2018/1/19.
 */
const {Users} = require('../models');
const logger = require('../config/logger_config').getLogger('proxy');
const Redis = require('../common/cache');
const Secret = require('../common/secret');

/**
 * 注册
 */
async function signUpUser(req, res) {
    try {
        const {username, phone, password} = req.body;

        logger.info('注册开始');

        const users = await Users.findAsync({$or: [{username: username}, {phone: phone}]});

        if(users && users.length > 0) {
            logger.info('用户名或手机号已被占用, 注册失败');
            throw new Error('用户名或手机号已被占用！');
        }

        logger.info('开始创建用户');

        const user = new Users();

        user.username = username;
        user.phone = Number.parseInt(phone, 10);
        user.password = password;

        const newUser = await user.saveAsync();

        logger.info('用户创建成功');
        logger.info('写入cookie redis登录状态');

        // 写redis 过期时间一天
        const [sessionId, userInfo] = setRedis(newUser, 60*60*24);

        // 将sessionId保存到cookie中
        res.cookie('RRIDSID', sessionId, { expires: new Date(Date.now() + 60*60*24*1000), httpOnly: true });

        logger.info('写入redis登录状态结束');

        logger.info('注册成功');
        res.send(createResultObj(true, '注册成功！', userInfo));

    } catch (err) {
        logger.info('注册失败');
        logger.info(err);
        res.send(createResultObj(false, err.message));
    }
}

async function signInUser (req, res) {
    try {
        const {username, password} = req.body;

        logger.info('登录开始');

        // 密码加密
        const sha1Password = Secret.stringEncryptSha1(password);

        const user = await Users.findAsync({username: username, password: sha1Password});

        if(user && user.length === 0){
            logger.info('登录失败 用户名密码不匹配');
            throw new Error('用户名密码不匹配');
        }

        // 登陆成功
        logger.info('登录成功');
        logger.info('写入cookie redis登录状态');

        // 写redis 过期时间一天
        const [sessionId, userInfo] = setRedis(user[0], 60*60*24);

        // 将sessionId保存到cookie中
        res.cookie('RRIDSID', sessionId, { expires: new Date(Date.now() + 60*60*24*1000), httpOnly: true });

        logger.info('写入redis登录状态结束');

        logger.info('登录成功');
        res.send(createResultObj(true, '登录成功！', userInfo));
    } catch (err) {
        logger.info('登录');
        logger.info(err);
        res.send(createResultObj(false, err.message));
    }
}

// 登出
async function signOutUser (req, res) {
    try {
        // 从cookie中找到sessionId
        const sessionId = req.cookies.RRIDSID;
        // 用户名验重 手机号验重
        // 根据sessionId 去找redis中的数据 然后删除
        await Redis.del(sessionId);
        logger.info('登出清除redis完成');
        logger.info('登出成功');
        res.send(createResultObj(true, '登录成功！'));
    } catch (err) {
        // 返回结果
        logger.info('登录失败');
        logger.info(err);
        res.send(createResultObj(false, err.message));
    }
}

// 公共方法
const createResultObj = (status = true, message = '', data = null) => ({
    status: status,
    message: message,
    data: data,
});

function setRedis(user, time) {
    const sessionId = Secret.stringEncryptSha1(user._id.toString());
    const userInfo = {
        userId: user._id,
        username: user.username,
        phone: user.phone
    };

    Redis.set(sessionId, userInfo, time);

    return [sessionId, userInfo];
}

module.exports = {
    signUpUser,
    signInUser,
    signOutUser
};