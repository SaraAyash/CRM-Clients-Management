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
            new_product.price = req.body.price
            new_product.description = req.body.description
            new_product.name = req.body.name
            new_product.date = req.body.date
            new_product.image = req.body.image
        
            //save model to database
            new_product.save(function(err) {
                if (err) {
                    
                    console.log("error in adding the new product\n" + err);
                    db.close()
                    res.status(400).send("err: " + err + " while trying to insert product.");
                } else {
                    console.log("product added succesfuly");
                    db.close();
                    res.status(200).send("product added!");
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
                    console.log("error in updating the details of product with id " + req.params["productID"]);
                    db.close()
                    res.status(500).send(err);
                }
                db.close()
                console.log("product " + product + "updated succesfuly!");
                res.status(200).send(product);
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
                    res.status(400).send("Error: " + err);
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
                    console.log("error in searching last purchase ");
                    db.close()
                    res.status(500).send(err);  
                } 
                console.log("details of last purchase");
                db.close()
                res.status(200).send(products);
            })
        });
    }

}