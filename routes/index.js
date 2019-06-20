var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// 引入mockjs
var Mock = require('mockjs');
require('./../models/company.js');
require('./../models/bus.js');
require('./../models/report.js');


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
  var Company = mongoose.model('Company');
  mongoose.Promise = global.Promise;
  // 从数据库查找数据
  Company.find({}, function(err, data) {
    if(err) {
      console.log("查询失败" + err);
      res.send(false);
      return;
    } else {
      res.render('pages/map', { 
        title: '地图',
        data: data
      });
    } 
  })
});


/* POST map page */
router.post('/map', function(req, res, next) {
  var totalMeter = 0;
  var sum = 0;
  var fullBus = 0;
  var goodBus = 0;
  var badBus = 0;
  var Bus = mongoose.model('Bus');
  mongoose.Promise = global.Promise;
  // 查找对应公司的公交车
  if (req.body.selMap) {
    Bus.find({own_of_company: req.body.sel_company})
      .sort({put_time: -1})
      .exec(function(err, data) {
      if(err) {
        console.log("查询失败" + err);
        res.send(false);
        return;
      } else {
        data.forEach(function(doc) {
          totalMeter = totalMeter + doc.run_of_meters;  // 总里程
          sum++;  // 在线车辆
          if(doc.rest_power > 25) {
              fullBus++;
          } else if(doc.rest_power <= 25 && doc.rest_power > 10) {
              goodBus++;
          } else {
              badBus++;
          }
        });
        var allData = {
          buses: data,              // 公交车信息
          totalMeter: totalMeter,   // 总里程
          sum: sum,                 // 在线车辆总数
          fullBus: fullBus,         // 充足电量
          goodBus: goodBus,         // 较足电量
          badBus: badBus            // 电量过低
        }
        res.send(allData)
      } 
    })
  }

  // 精确查询公交车
  if(req.body.isBus) {
    Bus.find({id_of_bus: req.body.sel_Bus}).exec(function(err, data) {
      if(err) {
        console.log('精确查询失败!' + err);
        res.send(false);
      } else if(data.length == 0) {
          res.send(false);
      } else {
        res.send(data);
      }
    })
  }
});


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
              rest_power: Mock.mock("@integer(1, 100)"),
              state: Mock.mock("@boolean"),
              thery_of_meters: req.body.theryMeters,
              run_of_meters: Mock.mock("@float(50, 400, 0, 2)"),
              operate_record: null,
              VIN: Mock.mock("@id"),
              power_of_storage: Mock.mock("@integer(800, 2000)"), 
              v_standard: 32,
              put_time: req.body.putTime,
              points: {        
                LoacationX: Mock.mock("@float(120, 120, 6, 6)"),
                LoacationY: Mock.mock("@float(30, 30, 6, 6)")
              }
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


/* GET 低电量车列表 page */
router.get('/lowpowerlist', function(req, res, next) {
  var Bus = mongoose.model('Bus');
  mongoose.Promise = global.Promise;
  var sum = 0;              //文档总数量
  var pageSize = 10;        //单页最大展示数量
  var pages = 0;            //页数
  var page = [];            //页数数组
  Bus.count({rest_power: {$lte: 25}}).exec(function(err, data) {
    if(err) {
      alert('查询失败!');
      return;
    }
    else {
      sum = data;              //获取文档总数
      Bus.find({rest_power: {$lte: 25}}).sort({put_time: -1}).limit(pageSize).exec(function(err,  data) {
        pages = Math.ceil(sum / pageSize);      // 获取页数
        for(let i = 1; i <= pages; i++) {       // 组成数组，便于前端渲染
          page.push(i);       
        }
        res.render('pages/carlist', { 
          title: '低电量监控',
          // 获取数据
          data: data,
          page: page
        });
      })
    }
  })
});


/* POST 低电量车列表 page */
router.post('/lowpowerlist', function(req, res, next) {
  var Bus = mongoose.model('Bus');
  mongoose.Promise = global.Promise;
  var sum = 0;              //文档总数量
  var pageSize = 10;        //单页最大展示数量
  var pages = 0;            //页数
  var page = [];            //页数数组
  Bus.count({rest_power: {$lte: 25}}, function(err, data) {
    if(err) {
      alert('查询失败!');
      return;
    }
    else {
      sum = data;              //获取文档总数
      Bus.find({rest_power: {$lte: 25}}).sort({put_time: -1}).limit(pageSize).exec(function(err,  data) {
        pages = Math.ceil(sum / pageSize);      // 获取页数
        for(let i = 1; i <= pages; i++) {       // 组成数组，便于前端渲染
          page.push(i);       
        }
        res.render('pages/carlist', { 
          title: '低电量监控',
          // 获取数据
          data: data,
          page: page
        });
      })
    }
  })
});


/* GET 车辆详情 page */
router.get('/detail', function(req, res, next) {
  var Bus = mongoose.model('Bus');
  mongoose.Promise = global.Promise;
  if(req.query.id) {
    Bus.find({_id: req.query.id}).exec(function(err, data) {
      if(err) { 
        console.log("查询失败");
      } else {
        res.render('pages/detail', { title: '车辆详情' , data: data});
      }
    })
  } else {  //直接渲染车辆列表
    res.render('pages/detail', { title: '车辆详情'});
  }
});


/* GET 报表下载 page */
router.get('/report', function(req, res, next) {
  var sum = 0;              //文档总数量
  var pageSize = 10;        //单页最大展示数量
  var pages = 0;            //页数
  var page = [];            //页数数组
  var Report = mongoose.model('Report');
  mongoose.Promise = global.Promise;
  Report.count({type_report: '日报'}).exec(function(err, data) {
    if(err) {
      console.log("报表查询错误" + err);
      res.send(false);
    } else {
      sum = data;
      Report.find().sort({put_time: -1}).limit(pageSize).exec(function(err,  data) {
        pages = Math.ceil(sum / pageSize);      // 获取页数
        for(let i = 1; i <= pages; i++) {       // 组成数组，便于前端渲染
          page.push(i);       
        }
        res.render('pages/report', { 
          title: '报表下载',
          // 获取数据
          data: data,
          page: page
        });
      })
    }
  })
});


/* POST 报表下载 page */
router.post('/report', function(req, res, next) {
  var Report = mongoose.model('Report');
  mongoose.Promise = global.Promise;
  var pageSize = 30;      // 当前页最大数

  //添加数据
  if(req.body.addReport) {
    var report = new Report({
      type_report: req.body.typeReport,
      put_time: req.body.putTime,
      id: Mock.mock("@id")
    });
    report.save(function(err) {
      if(err) {
        console.log('日志存储错误!' + err);
        res.send(false);
      } else {
        // 查找数据，并返回给Ajax
        Report.find({}, function(err, data) {
          if(err) {
          console.log('查询失败!' + err);
          res.send(false)
          }
          res.render('pages/report', {data: data});
        }).sort({put_time: -1}) //对输入数据的时间进行排序
      }
    })
  }

  // 分页设置
  if(req.body.getPage) {
    var currentPage = req.body.currentPage;
    Report.find()
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




