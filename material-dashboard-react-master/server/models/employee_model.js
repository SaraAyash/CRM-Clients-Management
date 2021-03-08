const { Email } = require('@material-ui/icons');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var validateType = function(type) {
	return type == "nature" || type == "people";
}

var minuteFromNow = function(){
    var timeObject = new Date();
    timeObject.setTime(timeObject.getTime() + 1000 * 60);
    return timeObject;
};

// define Schema
var EmployeeSchema = new Schema({
    _id: false,
	employee_id: {
		type: String,
		required: 'ID is required'
	},
	first_name: {
		type: String,
		required: 'First Name is required'
	},
    last_name: {
		type: String,
		required: 'Last Name is required'
	},
	password: {
		type: String,
		required: 'Phone Number is required',
		//validate: [validateType, 'Please fill a valid type(people/nature), default type is nature)']
	},
	email: {
		type: String,
        //type: Email,
        required: false,
        //validate: [ isEmail, 'Invalid email' ]
        unique:true
	},
    image: {
		type: String,
		required: 'Employee image is required'
	},
    about: {
        type: String,
        required: 'Employee description is required'
    },
	phone_number: {
		type: String,
		required: "phone number is required"
	}
});

module.exports = mongoose.model('employee', EmployeeSchema); 