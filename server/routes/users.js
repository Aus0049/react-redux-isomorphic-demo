const express = require('express');
const router = express.Router();

// users模块下的路径
router.get('/', function(req, res, next) {
  res.send('查看自己');
});

module.exports = router;
