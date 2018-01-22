/**
 * Created by Aus on 2018/1/19.
 */
// 加载model
const mongoose = require('mongoose');
const BPromise = require('bluebird');
const Users = require('./users');
mongoose.Promise = BPromise;

BPromise.promisifyAll(mongoose.Model);
BPromise.promisifyAll(mongoose.Model.prototype);
BPromise.promisifyAll(mongoose.Query.prototype);

exports.Users = mongoose.model('Users');