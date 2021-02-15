var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const port = 8080;
var axios = require('axios');
routes = require('./routes/routes');
var app = express()
 
app.use(cors());
// create application/json parser
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
 
app.use('/', routes);


const server = app.listen(port, () => console.log('Server is working on port ' + port));


