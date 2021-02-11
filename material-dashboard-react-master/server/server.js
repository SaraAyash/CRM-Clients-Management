// then in your app
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
 
var app = express()
 
app.use(cors());
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  console.log(req.body);
  res.status(200).send('welcome, ' + req.body.username)
})






// const express = require('express'),
//   cors = require('cors'),
//   bodyParser = require('body-parser'),
//   routes = require('./routes.js');
// const app = express();
const port = 8080;
// const path = require('path');
// const serveStatic = require('serve-static');

// app.use(serveStatic(path.join(__dirname, 'static')));
// app.use(cors());
// app.use(bodyParser);
// app.use(bodyParser.json());
// app.use(express.json())
// app.use(bodyParser.urlencoded({extended: true}));
// app.use('/', routes);


const server = app.listen(port, () => console.log('Server is working on port ' + port));