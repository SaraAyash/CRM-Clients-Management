
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

    //month distribution
    month_distribution: function(req, res) {
        console.log("========================= in month distribution =========================");
        mongoose.connect('mongodb://localhost:27017/CRM', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        var db = mongoose.connection;

        db.once('error', function() { //connection error
            console.error.bind(console, 'connection error:');
            res.status(400).send("connection error");
            return;
        })
        db.once('open', function() {
            const monthsArray = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
            console.log("connection successful!");
            Purchase.aggregate([
                    { "$match": { "date": {$gte: new Date((new Date().getTime() - (356 * 24 * 60 * 60 * 1000))) } } },
                    { "$group": { 
                        "_id":{ "month": {$substrCP: [ "$date", 0, 7 ] }} , 
                        "count": { $sum: 1 }
                    }},
                    { "$sort" : { "_id.month": 1}},
                    { 
                        "$project": { 
                            "_id": 0, 
                            "count": 1, 
                            "month": { $arrayElemAt: [ monthsArray, { $subtract: [ { $toInt: { $substrCP: [ "$_id.month", 5, 2 ] } }, 1 ] } ] }
                        } 
                    },
                    { 
                        "$group": { 
                            "_id": null, 
                            "data": { $push: { k: "$month", v: "$count" } }
                        } 
                    },
                    {
                        "$project": { 
                            "data": { $arrayToObject: "$data" }, 
                            "_id": 0 
                        } 
                    }
                ]
                , (err, data) => {
                if (err) {
                    console.log("error in getting the month distribution");
                    db.close()
                    res.status(500).send(err);
                }
                else{
                    db.close()
                    console.log("success in getting the month distribution");
                    res.status(200).send(data);
                }
            })
        })
    },

    //day distribution
    day_distribution: function(req, res) {
        console.log("========================= in day distribution =========================");
        mongoose.connect('mongodb://localhost:27017/CRM', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        var db = mongoose.connection;

        db.once('error', function() { //connection error
            console.error.bind(console, 'connection error:');
            res.status(400).send("connection error");
            return;
        })
        db.once('open', function() {
            const days = ['','Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            console.log("connection successful!");
            Purchase.aggregate([
                { "$match": { "date": { $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000))) } } },
                {
                    "$group": {
                        "_id": "$date",
                        "count": { $sum: 1 }
                    }
                },
                { "$sort": { "_id": 1 } },
                { 
                    "$project": { 
                        "_id": 0, 
                        "count": 1, 
                        "day": { $arrayElemAt: [ days, { $dayOfWeek: "$_id" } ] }
                    } 
                },
                { 
                    "$group": { 
                        "_id": null, 
                        "data": { $push: { k: "$day", v: "$count" } }
                    } 
                },
                {
                    "$project": { 
                        "data": { $arrayToObject: "$data" }, 
                        "_id": 0 
                    } 
                }
            ]
                , (err, data) => {
                if (err) {
                    console.log("error in getting the month distribution");
                    db.close()
                    res.status(500).send(err);
                }
                else{
                    db.close()
                    console.log("success in getting the month distribution");
                    res.status(200).send(data);
                }
            })
        })
    }

}