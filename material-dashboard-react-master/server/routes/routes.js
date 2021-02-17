const express = require('express'),
    login = require('./login.js'),
    // dashboard = require('./dashboard.js'),
    clients = require('./clients')
var router = express.Router();


router.post('/login', login.login);
router.get('/clients', clients.get_clients_list);
router.post('/clients', clients.add_client);
router.get('/clients/:client_id', clients.get_client_details);
 
module.exports = router;
