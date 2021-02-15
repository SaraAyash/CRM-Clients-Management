var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const port = 8080;
var app = express()
 
app.use(cors());
// create application/json parser
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
 
// POST /login gets urlencoded bodies

app.post('/login', function (req, res) {
  console.log(req.body.username);
  res.status(200).send('welcome, ' + req.body.username)
})



const server = app.listen(port, () => console.log('Server is working on port ' + port));

// const express = require('express'),
//   cors = require('cors'),
//   bodyParser = require('body-parser'),
//   routes = require('./routes.js');
// const app = express();

// const path = require('path');
// const serveStatic = require('serve-static');

// app.use(serveStatic(path.join(__dirname, 'static')));
// app.use(cors());
// app.use(bodyParser);
// app.use(bodyParser.json());
// app.use(express.json())
// app.use(bodyParser.urlencoded({extended: true}));
// app.use('/', routes);


