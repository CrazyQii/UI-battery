var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var nunjucks = require('nunjucks');

//引入jquery
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jquery')(window);


// // 导入Mongoose模块
// const mongoose = require('mongoose');

// // 设置mongoose连接
// const mongoDB = "mongodb+srv://HanlqMongoDB:hsy98106@cluster0-ctroo.azure.mongodb.net/test?retryWrites=true";
// mongoose.connect(mongoDB);

// // mongoose使用全局Promise库
// mongoose.Promise = global.Promise;
// // 取得默认连接
// const db = mongoose.connection;

// // 添加连接监听事件
// db.on('error', () => {console.log( 'MongoDB 连接错误')});
// db.on('connected', () => {console.log( 'MongoDB 连接成功')});
// db.on('disconnected', ()=> {console.log( 'MongoDB 已断开连接')});

// 连接MongoDB
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://HanlqMongoDB:hsy98106@cluster0-ctroo.azure.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


// 设置路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// var env = new nunjucks.Environment();
var env = nunjucks.configure('views', {
    // 控制输出是否被转译
    autoescape: true,
    // 传入express实例初始化模板设置
    express: app
});

// 添加自定义过滤器
// 获取百分比
env.addFilter('getPersent', function(data) {
    data = (Math.round(data * 10000)) / 100;
    return data;
})


// view engine setup

// 设置视图文件存放目录
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// 解析urlencoded请求体必备
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// 调用中间件库添加进请求处理链
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 设置静态文件存放目录
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
    
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// catch 404 and forward to error handler
// 捕获404并抛给错处处理器
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
// 错误处理器
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
