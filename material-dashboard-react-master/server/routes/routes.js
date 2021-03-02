const express = require('express'),
    login = require('./login.js'),
    clients = require('./clients'),
    calls = require('./calls'), 
    products = require('./products'),
    purchases = require('./purchases')
var router = express.Router();

// login
router.post('/login', login.login);

// clients
router.get('/clients/getList', clients.get_clients_list)
router.put('/clients/update/:clientID', clients.update_client)
router.post('/clients/add', clients.add_client)
router.get('/clients/search/:clientName', clients.search_client)
router.get('/clients/getLastWeek', clients.get_last_clients)
router.get('/clients/monthDistribution', clients.month_distribution)

// calls
router.post('/calls/add', calls.add_call)
router.get('/calls/getList/:clientID', calls.get_client_calls)

// products
router.post('/products/add', products.add_product);
router.put('/products/update/:productID', products.update_product);
router.get('/products/getList', products.get_products_list);
router.get('/products/getLastWeek', products.get_last_products);

// purchases
router.post('/purchases/add', purchases.add_purchase);
router.get('/purchases/getList/:clientId', purchases.get_client_purchase);
router.get('/purchases/getLastWeek', purchases.get_last_purchase)

module.exports = router;
