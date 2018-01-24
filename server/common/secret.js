/**
 * Created by Aus on 2018/1/23.
 */
// 获取加密后的sessionID
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const getSessionId = (userId) => {
    return bcrypt.hashSync(userId);
};

exports.getSessionId = getSessionId;

