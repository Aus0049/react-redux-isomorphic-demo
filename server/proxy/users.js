/**
 * Created by Aus on 2018/1/19.
 */
const {Users} = require('../models');
const logger = require('../config/logger_config').getLogger('proxy');
const Redis = require('../common/cache');
const Secret = require('../common/secret');
const crypto = require('crypto');

/**
 * 注册
 * @param {String} username 用户名
 * @param {Number} phone 手机号
 * @param {String} password 密码
 *
 * @callback {} 返回结果
 */
function signUpUser (username, phone, password) {
    logger.info('注册开始');

    return new Promise(function (resolve, reject) {
        findUserByUsernameAndPhone(username, phone)
            .then(()=>{
                logger.info('开始创建用户');
                const user = new Users();

                user.username = username;
                user.phone = Number.parseInt(phone, 10);
                user.password = password;

                return user.saveAsync();
            })
            .then((user)=>{
                logger.info('用户创建成功');
                logger.info('写入redis登录状态');

                // 写redis
                const userInfo = setRedis(user);

                logger.info('写入redis登录状态结束');
                resolve(userInfo);
            })
            .catch((err)=>{
                logger.info('注册失败');
                logger.info(err);
                reject(err);
            });
    });
}

function signInUser (username, password) {
    logger.info('登录开始');

    return new Promise((resolve, reject)=>{
        // 密码加密
        const shasum = crypto.createHash('sha1');
        shasum.update(password);
        const hasPassword = shasum.digest('hex');

        Users.findAsync({username: username, password: hasPassword})
            .then((users)=>{
                if(users && users.length === 1){
                    const user = users[0];
                    // 写session
                    const userInfo = setRedis(user);

                    resolve(userInfo);
                }

                reject({user: '用户名密码不匹配'});
            })
            .catch((err)=>{
                logger.info('登录失败');
                logger.info(err);
                reject(err);
            });
    });
}

function findUserByUsernameAndPhone (username, phone) {
    return new Promise(function (resolve, reject) {
        Users.findAsync({$or: [{username: username}, {phone: phone}]})
            .then((users)=>{
                if(users && users.length > 0){
                    logger.info('用户名或手机号已被占用, 注册失败');
                    return reject({username: '用户名或手机号已被占用!'});
                }

                resolve();
            })
    });
}

function setRedis(user) {
    const sessionId = Secret.getSessionId(user._id.toString());
    const userInfo = {
        userId: user._id,
        username: user.username,
        phone: user.phone
    };

    Redis.set(sessionId, userInfo);

    return userInfo;
}

module.exports = {
    signUpUser,
    signInUser
};