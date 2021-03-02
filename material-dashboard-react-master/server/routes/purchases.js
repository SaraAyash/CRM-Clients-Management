var Purchase = require('../models/purchase_model');
var mongoose = require('mongoose');

module.exports = {

    //add purchase
    add_purchase: function(req, res) {
        console.log("========================= in add purchase =========================");
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
            var new_purchase = new Purchase();
            new_purchase.productId = req.body.productId
            new_purchase.clientId = req.body.clientId
            new_purchase.totalPrice = req.body.totalPrice
            new_purchase.date = req.body.date
        
            //save model to database
            new_purchase.save(function(err) {
                if (err) {
                    console.log("error in adding the new purchase");
                    db.close()
                    res.status(400).send(err);
                } else {
                    console.log("purchase added succesfuly");
                    db.close();
                    res.status(200).send("purchase added succesfuly");
                }
            });
        });  
    },
    
    //get client purchase 
    get_client_purchase: function(req, res) {
        console.log("========================= in get client purchase =========================");
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
            Purchase.find({clientId:req.params["clientId"]}, (err, purchase) => {
                if (err){
                    console.log("error in searching client " + req.params["clientId"] + "purchase list");
                    db.close()
                    res.status(500).send(err);  
                } 
                console.log("success in searching client " + req.params["clientId"] + " purchase list");
                db.close()
                res.status(200).send(purchase);
            })
        });
    },

    //get purchaes from last week
    get_last_purchase: function(req, res) {
        console.log("========================= in get last purchases =========================");
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
            Purchase.find({ //query today up to tonight
                date: {
                    $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
                }
            }, (err, purchase) => {
                if (err){
                    console.log("error in searching last purchase ");
                    db.close()
                    res.status(500).send(err);  
                } 
                console.log("details of last purchase found successfuly");
                db.close()
                res.status(200).send(purchase);
            })
        });
    },

}