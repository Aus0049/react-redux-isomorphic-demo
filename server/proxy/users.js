/**
 * Created by Aus on 2018/1/19.
 */
const {Users} = require('../models');
const logger = require('../config/logger_config').getLogger('proxy');
const bcrypt = require('bcryptjs');

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
    return new Promise((resolve, reject)=>{
        // 用户名验重
        Users.findAsync({username: username})
            .then((users)=> {
                if(users && users.length > 0){
                    reject({username: '用户名已被占用!'});
                }
            })
            .then(()=>(Users.findAsync({phone: phone})))
            .then((users)=>{
                if(users && users.length > 0){
                    reject({username: '手机号已被占用!'});
                }
            })
            .then(()=>{
                const user = new Users();

                user.username = username;
                user.phone = Number.parseInt(phone, 10);
                user.password = password;

                return user.saveAsync()
            })
            .then((user)=>(resolve(user)))
            .catch((err)=>(reject(err)));
    });
}

function signInUser (username, password) {
    logger.info('登录开始');
    return new Promise((resolve, reject)=>{
        Users.findAsync({username: username, password: password})
            .then((users)=>{
                if(users && users.length === 1){
                    resolve(users[0]);
                }

                reject({user: '用户名密码不匹配'});
            })
            .catch((err)=>{
                reject(err);
            });
    });
}

module.exports = {
    signUpUser,
    signInUser
};