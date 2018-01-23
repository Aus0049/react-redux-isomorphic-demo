/**
 * Created by Aus on 2018/1/19.
 */
const mongoose = require('mongoose');
const BaseModel = require('./base');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const SALT_FACTOR = 10;

const UsersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    slogan: {type: String},
    headImage: {type: String},
    createTime: {
        type: Date,
        default: Date.now()
    },
}, {versionKey: false});

UsersSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    // 随机生成盐
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) return next(err);
        // 加盐哈希
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        })
    })
});

UsersSchema.methods.comparePassword = function (password, cb) {
    // 对比
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) { return cb(err) }
        cb(null, isMatch);
    })
};

UsersSchema.plugin(BaseModel);
UsersSchema.index({_id: 1});

mongoose.model('Users', UsersSchema);

module.exports = UsersSchema;