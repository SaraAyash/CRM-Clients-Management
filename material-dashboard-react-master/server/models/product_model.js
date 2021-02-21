const { Email } = require('@material-ui/icons');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var minuteFromNow = function(){
    var timeObject = new Date();
    timeObject.setTime(timeObject.getTime() + 1000 * 60);
    return timeObject;
};

// define Schema
var ProductSchema = new Schema({
	price: {
		type: Number,
		required: 'First Name is required'
	},
    description: {
		type: String,
		required: 'Last Name is required'
	},
	name: {
		type: String,
		required: 'Phone Number is required',
		//validate: [validateType, 'Please fill a valid type(people/nature), default type is nature)']
	},
	date: {
		type: Date,
        required: false,
	}
});

module.exports = mongoose.model('products', ProductSchema); 

