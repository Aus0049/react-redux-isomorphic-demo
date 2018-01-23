/**
 * Created by Aus on 2018/1/19.
 */
const config = require('./index');
const mongoose = require('mongoose');
const logger = require('../public/js/logger').getLogger('mongo');

mongoose.connect(config.db, {poolSize: 20})
    .then(()=>{
        logger.info('数据库连接成功！🍺');
    })
    .catch((err)=>{
        logger.error('数据库连接失败！😢');
        logger.error(err);
    });

require('../models');