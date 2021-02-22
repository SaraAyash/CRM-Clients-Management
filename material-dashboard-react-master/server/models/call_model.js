const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var minuteFromNow = function(){
    var timeObject = new Date();
    timeObject.setTime(timeObject.getTime() + 1000 * 60);
    return timeObject;
};

// define Schema
var CallSchema = new Schema({
	client_id: {
		type: Schema.Types.ObjectId,
		required: 'client ID is required'
	},
	date: {
		type: Date,
		required: ''
	},
    subject: {
		type: String,
		required: ''
	},
	description: {
		type: String,
		required: '',
	},
    purchasedProducts: {
		type: [String],
	}
});

module.exports = mongoose.model('call', CallSchema); 

