/**
 * Created by Aus on 2018/1/19.
 */
const tools = require('../common/tools');

module.exports = function (schema) {
    //获取当前数据的创建时间
    schema.methods.create_at_ago = function () {
        return tools.formatDate(this.create_at, true);
    };
};