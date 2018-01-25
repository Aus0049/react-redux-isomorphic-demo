/**
 * Created by Aus on 2018/1/23.
 */
// 获取加密后的sessionID
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// sha1加密方法
const stringEncryptSha1 = (str) => {

    const shasum = crypto.createHash('sha1');
    shasum.update(str);
    return shasum.digest('hex');
};

exports.stringEncryptSha1 = stringEncryptSha1;

