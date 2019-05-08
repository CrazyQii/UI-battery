const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConfirmsInfo = new Schema {
	{
		confirm_brand = {type: String, require: true, max: 100},
		confirm_own_bus = {type: int}
	}
}