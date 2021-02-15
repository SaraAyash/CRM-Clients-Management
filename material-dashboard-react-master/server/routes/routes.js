const express = require('express'),
    login = require('./login.js'),
    dashboard = require('./dashboard.js'),
    clients = require('./clients')
var router = express.Router();


router.post('/login', login.login);
router.get('/dashboard/tasks', dashboard.tasks);
router.get('/dashboard/products', dashboard.products);
router.get('/clients', clients.get_clients_list);
 
module.exports = router;
