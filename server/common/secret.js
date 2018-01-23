/**
 * Created by Aus on 2018/1/23.
 */
// 获取加密后的sessionID
const config  = require('../config');
const bcrypt = require('bcryptjs');

const getSessionId = (userId) => {
    console.log('secret');
    console.log('userId');
    console.log(userId);
    const secret = bcrypt.hashSync(userId);
    console.log(secret);
    return secret;
};

exports.getSessionId = getSessionId;

