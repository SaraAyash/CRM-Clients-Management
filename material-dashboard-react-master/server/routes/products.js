var Product = require('../models/product_model');
var mongoose = require('mongoose');

module.exports = {

    //add product
    add_product: function(req, res) {
        console.log("========================= in add product =========================");
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
            var new_product = new Product();
            console.log(req.body)
            new_product.price = req.body.price
            new_product.description = req.body.description
            new_product.name = req.body.name
            new_product.date = req.body.date
            new_product.image = req.body.image
            console.log("ggg")
            //save model to database
            new_product.save(function(err) {
                if (err) {
                    console.log(err);
                    db.close()
                    res.status(400).send(err);
                } else {
                    console.log("product added succesfuly");
                    db.close();
                    res.status(200).send("product added successfuly!");
                }
            });
        });
            
        
    },

    //update product
    update_product: function (req, res) {
        console.log("========================= in update product=========================");
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
            console.log("connection successful!");
            Product.findByIdAndUpdate(req.params["productID"], req.body, {
                new: true
            }, (err, product) => {
                if (err) {
                    console.log(err);
                    db.close()
                    res.status(500).send(err);
                }
                db.close()
                console.log("product with id: ", req.params["productID"], " updated successfuly!");
                res.status(200).send("product with id: ", req.params["productID"], " updated successfuly!");
            })
        })
    },

    //get products list
    get_products_list: function (req, res) {
        console.log("========================= in get products list=========================");
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
            console.log("connection successful!");
            Product.find({
            }, function(err, result) {
                if (err) {
                    console.log("error in getting the products list");
                    db.close()
                    res.status(400).send(err);
                } else {
                    console.log("products list found succesfuly");
                    db.close();
                    res.status(200).send(result);
                }
            })
        });     
    },

    //get last products (returns a list of products created in the last week)
    get_last_products: function(req, res) {
        console.log("========================= in get last products =========================");
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
            Product.find({ //query today up to tonight
                date: {
                    $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
                }
            }, (err, products) => {
                if (err){
                    console.log("error in searching last week new products");
                    db.close()
                    res.status(500).send(err);  
                } 
                console.log("success in searching last week new products");
                db.close()
                res.status(200).send(products);
            })
        });
    },

    //get_product
    get_product: function(req, res) {
        console.log("========================= in get_product =========================");
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
            Product.find({ _id:req.params["productId"]
            }, (err, product) => {
                if (err){
                    console.log("error in searching product with id:" + req.params["productId"]);
                    db.close()
                    res.status(500).send(err);  
                } 
                console.log("success in searching product with id:" + req.params["productId"]);
                db.close()
                res.status(200).send(product);
            })
        });
    }

}