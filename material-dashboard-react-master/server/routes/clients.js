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
            new_client.client_id = req.body.id
            new_client.first_name = req.body.firstName
            new_client.last_name = req.body.lastName
            new_client.phone_number = req.body.mobilePhone
            new_client.email = req.body.email
            new_client.gender = req.body.gender
            new_client.age = req.body.age

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
            console.log(req.params["clientID"]);
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

    //get new clients (return all the clients that have been added in the last week)
    get_new_clients: function (req, res) {
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
        // db.once('open', function() {
        //     console.log("connection successful!");
        //     Client.find(, req.body, {
        //         new: true
        //     }, (err, client) => {
        //         if (err) {
        //             console.log("error in updating the details of client with id " + req.params["id"]);
        //             db.close()
        //             res.status(500).send(err);
        //         }
        //         db.close()
        //         console.log("client " + client + "updated succesfuly!");
        //         res.status(200).send(client);
        //     })
        // })
    }



}