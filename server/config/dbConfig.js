/**
 * Created by Aus on 2018/1/19.
 */
const config = require('./index');
const mongoose = require('mongoose');

mongoose.connect(config.db, {server: {poolSize: 20}})
    .then(()=>{
        console.log('数据库连接成功！🍺');
    })
    .catch((err)=>{
        console.log('数据库连接失败！😢');
        console.log(err);
    });

require('../models');