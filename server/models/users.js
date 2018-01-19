/**
 * Created by Aus on 2018/1/19.
 */
const mongoose = require('mongoose');
const BaseModel = require('./base');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
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

UsersSchema.plugin(BaseModel);
UsersSchema.index({_id: 1});

mongoose.model('Users', UsersSchema);

module.exports = UsersSchema;