var express = require('express');
var router = express.Router();
// 引入mockjs
var Mock = require('mockjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("coming home");
  res.render('pages/index', { 
    title: '首页',
    // 获取数据
    data: Mock.mock({
        "success": true,
        "all_buses": function() {
          let sum = 0;
          for (let i = 0; i < this.data.length; i++) {
            sum = this.data[i].company_all_buses + sum;
          }
          return sum;
        },
        "all_spy_buses": function() {
          let spySum = 0;
          for (let i = 0; i < this.data.length; i++) {
            spySum = this.data[i].company_spy_buses + spySum;
          }
          return spySum;
        },
        "all_out_buses": function() {
          let outSum = 0;
          for (let i = 0; i < this.data.length; i++) {
            outSum = this.data[i].company_out_buses + outSum;
          }
          return outSum;
        },
        "data|10": [{
          "_id": "@id",
          "company_id": "@id",
          "company_name": "@city",
          "company_all_buses": "@integer(50, 500)",
          "company_spy_buses": "@integer(50, 500)",
          "company_out_buses": "@integer(50, 500)"
        }]
      })
  });
});


/* GET map page */
router.get('/map', function(req, res, next) {
  res.render('pages/map', { title: '地图' });
});


/* GET 车辆列表 page */
router.get('/carlist', function(req, res, next) {
  res.render('pages/carlist', { 
    title: '车辆列表',
    // 获取模拟数据
    data: Mock.mock({
      "success": true,
      "company_buses|10": [{
        "bus_of_title|2": "@character('upper')",
        "bus_of_num": "@integer(100, 999)",
        "bus_of_id": "@bus_of_title - @bus_of_num",
        "type_of_bus": "@integer(100, 999)",
        "route_of_bus": "@integer(1, 500)",
        "lisence_of_bus": "@string(5)",
        "start_of_bus": "@date(yyyy/mm/dd)",
        "rest_power": "@integer(1, 100)",
        "state": "@boolean",
        "thery_of_meters": "@integer(100, 1000)",
        "run_of_meters": "@float(100, @thery_of_meters, 0, 2)",
        "operate_record": "@url()"
      }]
    })
  });
});

/* GET 低电量车列表 page */
router.get('/lowpowerlist', function(req, res, next) {
  res.render('pages/lowpowerlist', { 
    title: '低电量车列表',
    data: Mock.mock({
      "success": true,
      "company_buses|10": [{
      "bus_of_title|2": "@character('upper')",
      "bus_of_num": "@integer(100, 999)",
      "bus_of_id": "@bus_of_title - @bus_of_num",
      "type_of_bus": "@integer(100, 999)",
      "route_of_bus": "@integer(1, 500)",
      "lisence_of_bus": "@string(5)",
      "start_of_bus": "@date(yyyy/mm/dd)",
      "rest_power": "@integer(1, 25)",
      "state": "@boolean",
      "thery_of_meters": "@integer(100, 1000)",
      "run_of_meters": "@float(100, @thery_of_meters, 0, 2)",
      "operate_record": "@url()"
    }]
    })
  });
});

/* GET 车辆详情 page */
router.get('/detail', function(req, res, next) {
  res.render('pages/detail', { title: '车辆详情' });
});

/* GET 报表下载 page */
router.get('/report', function(req, res, next) {
  res.render('pages/report', { 
    title: '报表下载',
    data: Mock.mock({
      "success": true,
      "report_of_day|5": [{
        "type": "day",
        "_id": "@id",
        "update_day": "@datetime(yyyy/mm/dd hh:mm:ss)",
        "report_of_bus": "@url",
        "type_of_bus": "@url",
        "both_of_bus": "@url"
      }],
      "report_of_month|5": [{
        "type": "month",
        "_id": "@id",
        "update_day": "@date(yyyy/mm)",
        "report_of_bus": "@url",
        "type_of_bus": "@url",
        "both_of_bus": "@url"
      }],
      "report_of_year|5": [{
        "type": "year",
        "_id": "@id",
        "update_day": "@date(yyyy)",
        "report_of_bus": "@url",
        "type_of_bus": "@url",
        "both_of_bus": "@url"
      }]
    })
  });
});



/* GET test listing. */
router.get('/test', function(req, res, next) {
    res.render('pages/test', {
    	title: '测试',
      data: Mock.mock({
        "confirms": {
          "confirm_name": "@city 公交集团",
          "confirm_all_buses": "@integer(50, 500)",
          "confirm_spy_buses": "@integer(50, @confirm_all_buses)",
          "comfirm_out_buses": "@integer(50, @confirm_all_buses)"
        }
      })
    });
});

module.exports = router;




