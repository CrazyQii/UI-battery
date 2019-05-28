const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 创建公交车数据模型
const BusSchema = new Schema({
	id_of_bus: String,			//车辆自编号
	type_of_bus: String,		//车辆型号
	route_of_bus: String,		//路线
	license_of_bus: String,		//车牌号
	start_of_bus: Date,			//启用时间
	rest_power: Number,			//剩余电量
	state: Boolean,				//状态
	thery_of_meters: Number,	//理论航程
	run_of_meters: Number,		//实际航程
	operate_record: String,		//操作记录
	VIN: Number,				//VIN
	own_of_company: String,		//所属公司
	power_of_storage: Number,	//存储总量
	v_standard: Number,			//额定电压
	put_time: Date,				//记录时间
	points: {					//记录地理坐标	
		LoacationX: Number,
		LoacationY: Number
	}
})

module.exports = mongoose.model('Bus', BusSchema);