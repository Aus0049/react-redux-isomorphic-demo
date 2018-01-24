/**
 * Created by Aus on 2018/1/19.
 */
const mongoose = require('mongoose');
const BaseModel = require('./base');
const Schema = mongoose.Schema;
const crypto = require('crypto');

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

    const shasum = crypto.createHash('sha1');
    shasum.update(user.password);
    user.password = shasum.digest('hex');

    next();
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