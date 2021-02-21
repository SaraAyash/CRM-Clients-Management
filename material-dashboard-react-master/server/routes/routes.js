const express = require('express'),
    login = require('./login.js'),
    clients = require('./clients')
var router = express.Router();

//login
router.post('/login', login.login);

//clients
router.get('/clients', clients.get_clients_list);
router.put('/clients/:clientID', clients.update_client)
router.post('/clients', clients.add_client);
router.get('/clients/search/:clientName', clients.search_client);
router.get('/clients/new', clients.get_new_clients)

module.exports = router;
