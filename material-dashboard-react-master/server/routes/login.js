var Employee = require('../models/employee_model');
var mongoose = require('mongoose');

module.exports = {

    //login
    login: function(req, res) {
        console.log(req.body);
        console.log("===================== in login =========================");
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
            Employee.find({$and:[{email:req.body.username},{password:req.body.password}]}, function(err, result) {
                if (err) {
                    console.log("login error");
                    db.close()
                    res.status(400).send(err);
                } else {
                    if ( !(result.length === 0) ){
                        console.log("login successful");
                        db.close();
                        res.status(200).send({
                            token: "te123324332st123"
                        })
                    } else {
                        console.log("login error");
                        db.close()
                        res.status(400).send("Error: " + err);
                    }
                }
            })
        });            
        
    },
}