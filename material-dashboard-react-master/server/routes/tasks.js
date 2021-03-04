var Task = require('../models/task_model');
var mongoose = require('mongoose');

module.exports = {

    //add_task
    add_task: function(req, res) {
        console.log(req.body);
        console.log("===================== in add_task =========================");
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
            var new_task = new Task();
            new_task.content = req.body.content
            new_task.employee_id = req.body.employee_id

        
            //save model to database
            new_task.save(function(err) {
                if (err) {
                    console.log(err);
                    console.log("error in adding the new task");
                    db.close()
                    res.status(400).send(err);
                } else {
                    console.log("task added succesfuly");
                    db.close();
                    res.status(200).send("task added!");
                }
            });
        });          
        
    },

    //update_task
    update_task: function (req, res) {
        console.log("========================= in update task =========================");
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
            Task.findByIdAndUpdate(req.params["taskId"], req.body, {
                new: true
            }, (err, task) => {
                if (err) {
                    console.log(err);
                    console.log("error in updating the details of task with id " + req.params["taskId"]);
                    db.close()
                    res.status(500).send(err);
                }
                db.close()
                console.log("success in updating the details of task with id " + req.params["taskId"]);
                res.status(200).send(task);
            })
        })
    },

    //get_tasks_list
    get_tasks_list: function (req, res) {
        console.log("===================== in get tasks list =========================");
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
            Task.find({
            }, function (err, result) {
                if (err) {
                    console.log("error in getting the tasks list");
                    db.close()
                    res.status(400).send("Error: " + err);
                } else {
                    console.log("tasks list found succesfuly");
                    db.close();
                    res.status(200).send(result);
                }
            })
        });

    },

    //delete_task
    delete_task: function (req, res) {
        console.log("===================== in delete_task =========================");
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
            Task.remove({ _id:req.params["taskId"]
            }, function (err, result) {
                if (err) {
                    console.log("error in removing the tasks list");
                    db.close()
                    res.status(400).send("Error: " + err);
                } else {
                    console.log("task removed succesfuly");
                    db.close();
                    res.status(200).send(result);
                }
            })
        });

    }
}