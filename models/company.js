const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 创建公司数据模式
const CompanySchema = new Schema ({
		name: String,
		own_buses: Number,
		spy_buses: Number,
		out_buses: Number,
})

// 创建一个model
module.exports = mongoose.model('Company', CompanySchema)