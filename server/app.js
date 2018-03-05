/**
 * Created by Aus on 2018/3/5.
 */
// 基本配置引入
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
// const RedisStore = require('connect-redis')(session);

const config = require('./config');
// const redisConfig = require('./config/redis_config');
// const routeLog = require('./middlewares/route_log');
// const signInCheck = require('./middlewares/sign_in_check');
const routes = require('./route/');
// const says = require('./routes/says');
// const says = require('./routes/says');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 配置中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(session({
//     store: new RedisStore({client: redisConfig, db: 1}),
//     secret: config.session_secret,
//     resave: true,
//     saveUninitialized: true
// }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(routeLog);
// app.use(signInCheck);

// 配置数据库
// require('./config/db_config');

// 配置路由
const routePrefix = '/api';
app.use(`${routePrefix}/`, routes);

module.exports = app;
