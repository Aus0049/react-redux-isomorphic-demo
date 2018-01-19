// 基本配置引入
const express = require('express');
const config = require('./config');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');

const users = require('./routes/users');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 配置中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 配置数据库
require('./config/dbConfig');

// 配置路由
const routePrefix = '/api';
app.use(`${routePrefix}/users`, users);





// catch 404 and forward to error handler
// app.use(errorPageMiddleware.errorPage);

// app.use(function (err, req, res, next) {
//     if (typeof err === 'number') {
//         res.json({
//             code: err,
//             message: errorCode[err]
//         });
//         return
//     }
//     next(err)
// });
//
// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

module.exports = app;
