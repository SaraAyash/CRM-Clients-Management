const express = require('express'),
    login = require('./login.js'),
    clients = require('./clients'),
    calls = require('./calls'), 
    products = require('./products'),
    purchases = require('./purchases')
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
router.put('/products/:productID', products.update_product);
router.get('/products', products.get_products_list);
router.get('/products/last_week', products.get_last_products);

//purchases/ http://localhost:8080/search/purcheses
router.post('/purchases/add', purchases.add_purchase);
router.get('/purchases/search/:clientId', purchases.get_client_purchase);
router.get('/purchases/last', purchases.get_last_purchase)

module.exports = router;
