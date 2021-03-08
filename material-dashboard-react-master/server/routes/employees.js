var Employee = require('../models/employee_model');
var mongoose = require('mongoose');

module.exports = {

    //get_employees_list
    get_employees_list: function(req, res) {
        console.log("===================== in get_employees_list =========================");
        mongoose.connect('mongodb://localhost:27017/CRM', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        var db = mongoose.connection;

        db.once('error', function() { //connection error
            console.error.bind(console, 'connection error:');
            res.status(400).send("connection error:");
            return;
        })
        db.once('open', function() {
            console.log("connection successful!");
            Employee.find({}, (err, employees) => {
                if (err){
                    // console.log(err);
                    console.log("find employees_list fail");
                    db.close()
                    res.status(500).send(err);  
                } 
                console.log("success employees_list");
                db.close()
                res.status(200).send(employees);
            })
        });
            
        
    },

    //get_employees_by_id
    get_employees_by_id: function(req, res) {
        console.log("===================== in get_employees_by_id =========================");
        mongoose.connect('mongodb://localhost:27017/CRM', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        var db = mongoose.connection;

        db.once('error', function() { //connection error
            console.error.bind(console, 'connection error:');
            res.status(400).send("connection error:");
            return;
        })
        db.once('open', function() {
            console.log("connection successful!");
            Employee.find({_id:req.params["employeeId"]}, (err, employee) => {
                if (err){
                    // console.log(err);
                    console.log("find employee by id failed");
                    db.close()
                    res.status(500).send(err);  
                } 
                console.log("success in finding employee by id");
                db.close()
                res.status(200).send(employee);
            })
        });
            
        
    },

    //get_employees_by_Email
    get_employees_by_Email: function(req, res) {
        console.log("===================== in get_employees_by_Email =========================");
        mongoose.connect('mongodb://localhost:27017/CRM', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        var db = mongoose.connection;

        db.once('error', function() { //connection error
            console.error.bind(console, 'connection error:');
            res.status(400).send("connection error:");
            return;
        })
        db.once('open', function() {
            console.log("connection successful!");
            Employee.find({email:req.params["employeeEmail"]}, (err, employee) => {
                if (err){
                    // console.log(err);
                    console.log("find employee by id failed");
                    db.close()
                    res.status(500).send(err);  
                } 
                console.log("success in finding employee by id");
                db.close()
                res.status(200).send(employee);
            })
        });
            
        
    }
}

