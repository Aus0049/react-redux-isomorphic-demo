// res的扩展函数

//controllers下对于404和错误的统一处理 ！注意 对于一个API的错误 不要调用此函数！
exports.errorPage = function (req, res, next) {

  res.render404 = function (error) {
    return res.status(404).render('notfound', { error: error });
  };

  res.renderError = function (error, statusCode) {
    if (statusCode === undefined) {
      statusCode = 400;
    }
    return res.status(statusCode).render('notfound', { error: error });
  };

  next();
};
