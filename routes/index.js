var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: '首页' });
});

/* GET map page */
router.get('/map', function(req, res, next) {
  res.render('pages/map', { title: '地图' });
});


/* GET 车辆列表 page */
router.get('/carlist', function(req, res, next) {
  res.render('pages/carlist', { title: '车辆列表' });
});

/* GET 低电量车列表 page */
router.get('/lowpowerlist', function(req, res, next) {
  res.render('pages/lowpowerlist', { title: '低电量车列表' });
});

/* GET 车辆详情 page */
router.get('/detail', function(req, res, next) {
  res.render('pages/detail', { title: '车辆详情' });
});

/* GET 报表下载 page */
router.get('/report', function(req, res, next) {
  res.render('pages/report', { title: '报表下载' });
});

module.exports = router;



