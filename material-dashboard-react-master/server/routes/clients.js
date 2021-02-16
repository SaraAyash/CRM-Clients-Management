var Client = require('../models/client_model');
var mongoose = require('mongoose');

module.exports = {

    //clients list
    get_clients_list: function(req, res) {
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
            Client.find({
            }, function(err, result) {
                if (err) {
                    res.status(400).send("Error: " + err);
                    return;
                } else {
                    //var data = JSON.parse(result);
                    //res.send(Object.getOwnPropertyNames(result[0].pictures).sort());return;
                    res.status(200).send(result);
                    return;
                }
            })
        });
            
        
    } ,

    //add client
    add_client: function(req, res) {
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
            var new_client = new Client();
            new_client.client_id = '10'
            new_client.first_name = 'a'
            new_client.last_name = 'b'
            new_client.phone_number = '1234'
            new_client.email = 'fwitch9@sun.com'
        
            //save model to database
            new_client.save(function(err, album) {
                if (err) {
                    res.status(400).send("err: " + err + " while trying to insert client.");
                } else {
                    res.status(200).send("client: " + new_client.first_name + " added!");
                }
            });
        });
            
        
    },

    //get_client_details
    get_client_details: function (req, res) {
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
            var client_name = req.params.clientName;
        
            Client.find({"first_name":client_name}, (err, client) => {
                if (err) return res.status(500).send(err);
                return res.status(200).send(client);
            })
        });
    }

}