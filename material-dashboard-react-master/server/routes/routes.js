const express = require('express'),
    login = require('./login.js'),
    clients = require('./clients'),
    calls = require('./calls'), 
    products = require('./products')
var router = express.Router();

//login
router.post('/login', login.login);

//clients
router.get('/clients', clients.get_clients_list);
router.put('/clients/:clientID', clients.update_client)
router.post('/clients', clients.add_client);
router.get('/clients/search/:clientName', clients.search_client);
router.get('/clients/new', clients.get_new_clients)

//calls
router.post('/calls', calls.add_call)
router.get('/calls/:clientID', calls.get_client_calls)

//products
router.post('/products', products.add_product);

module.exports = router;
