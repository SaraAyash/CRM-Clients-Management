var Call = require('../models/call_model');
var mongoose = require('mongoose');

module.exports = {

    //add call
    add_call: function(req, res) {
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
            var new_call = new Call();
            new_call.client_id = req.body.clientId
            new_call.date = req.body.date
            new_call.subject = req.body.subject
            new_call.description = req.body.description
            new_call.purchasedProducts = req.body.purchasedProducts

        
            //save model to database
            new_call.save(function(err) {
                if (err) {
                    console.log(err);
                    console.log("error in adding the new call");
                    db.close()
                    res.status(400).send("err: " + err + " while trying to insert a call.");
                } else {
                    console.log("call added succesfuly");
                    db.close();
                    res.status(200).send("Call added!");
                }
            });
        });
            
        
    },
    get_client_calls: function(req, res) {
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

            //save model to database
            Call.find({client_id:req.params["clientID"]}, (err, calls) => {
                if (err){
                    // console.log(err);
                    console.log("find client_calls fail");
                    db.close()
                    res.status(500).send(err);  
                } 
                console.log("calls: "+ calls);
                db.close()
                res.status(200).send(calls);
            })
        });
            
        
    }
}

