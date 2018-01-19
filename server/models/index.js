/**
 * Created by Aus on 2018/1/19.
 */
// 加载model
const mongoose = require('mongoose');
const Users = require('./users');

exports.Users = mongoose.model('Users');