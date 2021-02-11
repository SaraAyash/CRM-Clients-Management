const express = require('express'),
    login = require('./login.js'),
    dashboard = require('./dashboard.js');
var router = express.Router();


router.post('/login', login.login);
router.get('/dashboard/tasks', dashboard.tasks);
router.get('/dashboard/products', dashboard.products);
 
 
module.exports = router;
