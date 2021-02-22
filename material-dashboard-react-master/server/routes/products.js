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
        
            //save model to database
            new_product.save(function(err) {
                if (err) {
                    console.log("error in adding the new product");
                    db.close()
                    res.status(400).send("err: " + err + " while trying to insert product.");
                } else {
                    console.log("product added succesfuly");
                    db.close();
                    res.status(200).send("product added!");
                }
            });
        });
            
        
    }

    // //update product
    // update_product: function (req, res) {
    //     console.log("========================= in update product=========================");
    //     mongoose.connect('mongodb://localhost:27017/CRM', {
    //             useNewUrlParser: true,
    //             useUnifiedTopology: true
    //         });
    //     var db = mongoose.connection;

    //     db.once('error', function() { //connection error
    //         console.error.bind(console, 'connection error:');
    //         res.status(400).send("connection error");
    //         return;
    //     })
    //     db.once('open', function() {
    //         console.log("connection successful!");
    //         product.findByIdAndUpdate(req.params["id"], req.body, {
    //             new: true
    //         }, (err, product) => {
    //             if (err) {
    //                 console.log("error in updating the details of product with id " + req.params["id"]);
    //                 db.close()
    //                 res.status(500).send(err);
    //             }
    //             db.close()
    //             console.log("product " + product + "updated succesfuly!");
    //             res.status(200).send(product);
    //         })
    //     })
    // }
}