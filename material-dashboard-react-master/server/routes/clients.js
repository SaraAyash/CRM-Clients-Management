var Client = require('../models/client_model');
var mongoose = require('mongoose');

module.exports = {

    //clients list
    get_clients_list: function (req, res) {
        console.log("===================== in get clients list =========================");
        mongoose.connect('mongodb://localhost:27017/CRM', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        var db = mongoose.connection;

        db.once('error', function () { //connection error
            console.error.bind(console, 'connection error:');
            res.status(400).send("connection error:");
            return;
        })
        db.once('open', function () {
            console.log("connection successful!");
            Client.find({
            }, function (err, result) {
                if (err) {
                    console.log("error in getting the clients list");
                    db.close()
                    res.status(400).send("Error: " + err);
                } else {
                    console.log("clients list found succesfuly");
                    db.close();
                    res.status(200).send(result);
                }
            })
        });

    },

    //add client
    add_client: function (req, res) {
        console.log("========================= in add client =========================");
        mongoose.connect('mongodb://localhost:27017/CRM', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        var db = mongoose.connection;

        db.once('error', function () { //connection error
            console.error.bind(console, 'connection error:');
            res.status(400).send("connection error:");
            return;
        })
        db.once('open', function () {
            console.log("connection successful!");
            var new_client = new Client();
            new_client.client_id = req.body.client_id
            new_client.first_name = req.body.first_name
            new_client.last_name = req.body.last_name
            new_client.phone_number = req.body.phone_number
            new_client.email = req.body.email
            new_client.gender = req.body.gender
            new_client.year_of_birth = req.body.year_of_birth
            new_client.start_connection_date = req.body.start_connection_date

            //save model to database
            new_client.save(function (err) {
                if (err) {

                    console.log("error in adding the new client");
                    db.close()
                    res.status(400).send("err: " + err + " while trying to insert client.");
                } else {
                    console.log("client added succesfuly");
                    db.close();
                    res.status(200).send("client: " + new_client.first_name + " added!");
                }
            });
        });


    },

    //search client by name (may return more than 1..)
    search_client: function (req, res) {
        console.log("========================= in get client details =========================");
        mongoose.connect('mongodb://localhost:27017/CRM', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        var db = mongoose.connection;

        db.once('error', function () { //connection error
            console.error.bind(console, 'connection error:');
            res.status(400).send("connection error");
            return;
        })
        db.once('open', function () {
            console.log("connection successful!");
            Client.find({ first_name: req.params["clientName"] }, (err, client) => {
                if (err) {
                    console.log("error in searching client " + req.params["clientName"]);
                    db.close()
                    res.status(500).send(err);
                }
                console.log("details of client " + req.params["clientName"] + ":" + client);
                db.close()
                res.status(200).send(client);
            })
        });
    },

    //update client
    update_client: function (req, res) {
        console.log("========================= in update client=========================");
        mongoose.connect('mongodb://localhost:27017/CRM', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        var db = mongoose.connection;

        db.once('error', function () { //connection error
            console.error.bind(console, 'connection error:');
            res.status(400).send("connection error");
            return;
        })
        db.once('open', function () {
            console.log("connection successful!");
            Client.findByIdAndUpdate(req.params["clientID"], req.body, {
                new: true
            }, (err, client) => {
                if (err) {
                    console.log(err);
                    console.log("error in updating the details of client with id " + req.params["clientID"]);
                    db.close()
                    res.status(500).send(err);
                }
                db.close()
                console.log("client " + client + "updated succesfuly!");
                res.status(200).send(client);
            })
        })
    },

    //get last clients (return all the clients that have been added in the last 2 week)
    get_last_clients: function (req, res) {
        console.log("========================= in get last clients =========================");
        mongoose.connect('mongodb://localhost:27017/CRM', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        var db = mongoose.connection;

        db.once('error', function () { //connection error
            console.error.bind(console, 'connection error:');
            res.status(400).send("connection error:");
            return;
        })
        db.once('open', function () {
            console.log("connection successful!");
            Client.find({ //query today up to tonight
                start_connection_date: {
                    $gte: new Date((new Date().getTime() - (14 * 24 * 60 * 60 * 1000)))
                }
            }, (err, client) => {
                if (err) {
                    console.log("error in searching last week new clients");
                    db.close()
                    res.status(500).send(err);
                }
                console.log("success in searching last week new clients");
                db.close()
                res.status(200).send(client);
            })
        });
    },

    //month distribution (return the number of the new clients for each month in the last year)
    month_distribution: function (req, res) {
        console.log("========================= in month distribution =========================");
        mongoose.connect('mongodb://localhost:27017/CRM', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        var db = mongoose.connection;

        db.once('error', function () { //connection error
            console.error.bind(console, 'connection error:');
            res.status(400).send("connection error");
            return;
        })
        db.once('open', function () {
            const monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            console.log("connection successful!");
            Client.aggregate([
                { "$match": { "start_connection_date": { $gte: new Date((new Date().getTime() - (356 * 24 * 60 * 60 * 1000))) } } },
                {
                    "$group": {
                        "_id": { "month": { $substrCP: ["$start_connection_date", 0, 7] } },
                        "count": { $sum: 1 }
                    }
                },
                { "$sort": { "_id.month": 1 } },
                {
                    "$project": {
                        "_id": 0,
                        "count": 1,
                        "month": { $arrayElemAt: [monthsArray, { $subtract: [{ $toInt: { $substrCP: ["$_id.month", 5, 2] } }, 1] }] }
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
                    else {
                        db.close()
                        console.log("success in getting the month distribution");
                        res.status(200).send(data);
                    }
                })
        })
    }
}

