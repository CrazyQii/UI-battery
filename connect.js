// 导入Mongoose模块
const mongoose = require('mongoose');

// 设置mongoose连接
const uri = "mongodb+srv://HanlqMongoDB:hsy98106@cluster0-ctroo.azure.mongodb.net/电量监控";
mongoose.connect(uri, { useNewUrlParser: true });

// mongoose使用全局Promise库
mongoose.Promise = global.Promise;
// 取得默认连接
const db = mongoose.connection;

// 添加连接监听事件
db.on('error', () => {console.log( 'MongoDB 连接错误' + error)});
db.on('open', () => {console.log( 'MongoDB 连接成功')});
db.on('disconnected', ()=> {console.log( 'MongoDB 已断开连接')});

// 连接MongoDB
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://HanlqMongoDB:hsy98106@cluster0-ctroo.azure.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });