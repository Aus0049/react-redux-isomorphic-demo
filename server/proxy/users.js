/**
 * Created by Aus on 2018/1/19.
 */
const {Users} = require('../models');

/**
 * 注册
 * @param {String} username 用户名
 * @param {Number} phone 手机号
 * @param {String} password 密码
 *
 * @callback {} 返回结果
 */
function signUpUser (username, phone, password) {
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
            .then((user)=>(resolve()))
            .catch((err)=>(reject(err)));
    });
}

module.exports = {
    signUpUser
};