const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 创建公司数据模式
const ReportSchema = new Schema ({
		type_report: String,	// 报表类型
		put_time: Date,			// 报表时间
		id: Number				// 索引
})

// 创建一个model
module.exports = mongoose.model('Report', ReportSchema)