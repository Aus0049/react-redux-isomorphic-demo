/**
 * Created by Aus on 2018/1/19.
 */
// 工具类函数
const bcrypt = require('bcryptjs');
const moment = require('moment');

moment.locale('zh-cn'); // 使用中文

// 格式化时间
exports.formatDate = function (date, friendly) {
    date = moment(date);

    if (friendly) {
        return date.fromNow();
    }

    return date.format('YYYY-MM-DD HH:mm');
};