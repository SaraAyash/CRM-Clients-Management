var Call = require('../models/call_model');
var mongoose = require('mongoose');

module.exports = {

    //add call
    add_call: function(req, res) {
        console.log("===================== in add call =========================");
        mongoose.connect('mongodb://localhost:27017/CRM', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        var db = mongoose.connection;

        db.once('error', function() { //connection error
            console.error.bind(console, 'connection error');
            res.status(400).send("connection error:");
            return;
        })
        db.once('open', function() {
            console.log("connection successful!");
            var new_call = new Call();
            new_call.client_id = req.body.client_id
            new_call.date = req.body.date
            new_call.subject = req.body.subject
            new_call.description = req.body.description
            new_call.purchasedProducts = req.body.purchasedProducts

        
            //save model to database
            new_call.save(function(err) {
                if (err) {
                    console.log("error in adding the new call");
                    db.close()
                    res.status(400).send(err);
                } else {
                    console.log("call added succesfuly");
                    db.close();
                    res.status(200).send("Call added!");
                }
            });
        });
            
        
    },
    
    //get client calls
    get_client_calls: function(req, res) {
        console.log("===================== in get client calls =========================");
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
            Call.find({client_id:req.params["clientID"]}, (err, calls) => {
                if (err){
                    console.log(err);
                    db.close()
                    res.status(500).send(err);  
                } 
                console.log("calls of client with id: ",req.params["clientID"]," found successfult");
                db.close()
                res.status(200).send(calls);
            })
        });
            
        
    }
}

