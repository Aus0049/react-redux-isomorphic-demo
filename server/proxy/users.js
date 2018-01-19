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
    // 用户名验重
    // const repeatUsername = findUserByUsername(username);
    //
    // repeatUsername


        // .then((err, repeatUsernameUser)=>{
        //     if(repeatUsernameUser){
        //         // 重复
        //         return createResultObj(false, {username: '用户名重复'});
        //     }
        //
        //     Users.findOne({phone: phone})
        //         .then((err, repeatPhoneUser)=>{
        //             if(repeatPhoneUser){
        //                 // 重复
        //                 return createResultObj(false, {phone: '用户手机号重复'});
        //             }
        //
        //             // 没重复
        //             console.log('没重复 可以存入');
        //             return createResultObj(true);
        //         });
        // });
    // 手机号验重
};

const findUserByUsername = ( username ) => {
    return Users.findOne({username: username})
        .then((err, user) => {
            return user;
        });
};

const createResultObj = ( status = true, data ) => ({
    status: status,
    message: null,
    data: data,
});

module.exports = {
    signUpUser
};