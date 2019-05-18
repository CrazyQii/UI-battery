var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// 引入mockjs
var Mock = require('mockjs');
require('./../models/company.js');
require('./../models/bus.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("coming home");
  var ownBusCount = 0;
  var outBusCount = 0;
  var spyBusCount = 0;
  // 引入model模型
  var Company = mongoose.model('Company');
  mongoose.Promise = global.Promise;
  // 从数据库查找数据
  Company.find({}, function(err, data) {
    if(err) {
      console.log("查询失败" + err);
      return;
    }
    // 循环遍历数据,计算车辆总和
    data.forEach(function(doc) {
      if (doc.own_buses) {
        ownBusCount = ownBusCount + doc.own_buses;
      }
      if (doc.out_buses) {
        outBusCount = outBusCount + doc.out_buses;
      }
      if (doc.spy_buses) {
        spyBusCount = spyBusCount + doc.spy_buses;
      }
    })
    // 渲染数据和页面
    res.render('pages/index', { 
      title: '首页', 
      'data': data, 
      'ownBusCount': ownBusCount,
      'outBusCount': outBusCount,
      'spyBusCount': spyBusCount
    });
  })

});


/* GET map page */
router.get('/map', function(req, res, next) {
  res.render('pages/map', { title: '地图' });
});


/* POST 车辆列表 page */
router.post('/carlist', function(req, res, next) {
  var pageSize = 10;      // 当前页最大数
  // 引入model模型
  var Bus = mongoose.model('Bus');
  mongoose.Promise = global.Promise;

  // 添加数据
  if(req.body.addBus) {
    // 查询车辆自编号是否存在
    Bus.count({id_of_bus:  req.body.busId}, function(err, data) {
      console.log('车辆自编号存在数量:' + data)
      if(err) { console.log('查询错误'); res.send(false);} 
      else if(data != 0) {
        res.send(false);
      } 
      else {
        // 查询车牌照是否存在
        Bus.count({ 
        license_of_bus: req.body.busNum
      }, function(err, data) {
          console.log('车牌照存在数量: '+ data);
          if(err) {
            console.log('查询数据错误'+err);
            res.send(false);
          } else if(data == 0){
            // 将获取到的数据插入数据库
            var bus = new Bus({
              own_of_company:  req.body.companyBus,
              id_of_bus:  req.body.busId,
              type_of_bus:  req.body.busType,
              route_of_bus:  req.body.busRoute,
              license_of_bus:  req.body.busNum,
              start_of_bus:  req.body.startTime,
              rest_power: Mock.mock({"rest_power": "@integer(1, 25)"}),
              state: Mock.mock({"state": "@boolean"}),
              thery_of_meters: req.body.theryMeters,
              run_of_meters: Mock.mock({"run_of_meters": "@float(100, @thery_of_meters, 0, 2)"}),
              operate_record: null,
              VIN: 4654231454646,
              power_of_storage: Mock.mock({"rest_power": "@integer(800, 2000)"}), 
              v_standard: 32,
              put_time: req.body.putTime
            });
            // 将数据存储到数据库当中
            bus.save(function(err) {
              if(err) {
                console.log('数据存储状态: ' + err);
                res.send(false);
              } else {
                // 查找数据，并返回给Ajax
                Bus.find({}, function(err, data) {
                  if(err) {
                  console.log('查询失败!' + err);
                  res.send(false)
                  }
                  res.render('pages/carlist', {data: data});
                }).sort({put_time: -1}) //对输入数据的时间进行排序
              }
            })
          } else if(data > 0) {  //如果已经存在该公交车,返回false
            res.send(false)
          }
        })
      }
    });
  }

  // 删除数据
  if(req.body.deleteBus) {
    Bus.remove({
      license_of_bus:  req.body.selBusLicense
    },function(err, data) {
      if(err) {
        console.log('删除数据失败' + err);
        res.send('fail');
        return;
      } else {
        console.log('删除数据成功');
        res.send('success');
      }
    })
  }

  // 查询数据
  if(req.body.queryBusId) {
    var val = req.body.busId;
    Bus.find({id_of_bus: val})
      .sort({put_time: -1})
      .limit(pageSize)
      .exec(function(err, data) {
        if(err) {
          console.log('查询错误' + err);
          res.send(false);
        } else {
          res.send(data)
        }
      })
  }
  
  // 分页设置
  if(req.body.getPage) {
    var currentPage = req.body.currentPage;
    Bus.find()
      .sort({put_time: -1})
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize)
      .exec(function(err, data) {
        if(err) { 
          console.log('查询失败' + err);
          res.send(false);
        }
        else {
          res.send({data, currentPage});
        }
      })
  }
})


/* GET 车辆列表 page */
router.get('/carlist', function(req, res, next) {
  var Bus = mongoose.model('Bus');
  mongoose.Promise = global.Promise;
  var sum = 0;              //文档总数量
  var pageSize = 10;        //单页最大展示数量
  var pages = 0;            //页数
  var page = [];            //页数数组
  Bus.count({}, function(err, data) {
    if(err) {
      alert('查询失败!');
      return;
    }
    else {
      sum = data;              //获取文档总数
      Bus.find().sort({put_time: -1}).limit(pageSize).exec(function(err,  data) {
        pages = Math.ceil(sum / pageSize);      // 获取页数
        for(let i = 1; i <= pages; i++) {       // 组成数组，便于前端渲染
          page.push(i);       
        }
        res.render('pages/carlist', { 
          title: '车辆列表',
          // 获取数据
          data: data,
          page: page
        });
      })
    }
  })
});


/* GET 低电量车列表 page */
router.get('/lowpowerlist', function(req, res, next) {
  res.render('pages/lowpowerlist', { 
    title: '低电量监控',
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




