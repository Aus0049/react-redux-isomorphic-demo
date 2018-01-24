/**
 * Created by Aus on 2018/1/23.
 */
// 获取加密后的sessionID
const config  = require('../config');
const bcrypt = require('bcryptjs');

const getSessionId = (userId) => {
    const salt = bcrypt.genSaltSync(config.salt_factory);

    return bcrypt.hashSync(userId, salt);
};

exports.getSessionId = getSessionId;

