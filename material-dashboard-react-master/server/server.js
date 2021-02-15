var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const port = 8080;
var axios = require('axios');
 
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


 

app.get('/clients', function (req, res, next) {
  res.json(clients)
});
 
var clients=[{"id":"1","first_name":"Andris","last_name":"Inchboard","email":"ainchboard0@weibo.com","gender":"Agender"},
{"id":"2","first_name":"Marcellina","last_name":"Grovier","email":"mgrovier1@tamu.edu","gender":"Female"},
{"id":"3","first_name":"Marge","last_name":"McCullagh","email":"mmccullagh2@desdev.cn","gender":"Genderqueer"},
{"id":"4","first_name":"Dolley","last_name":"Echalier","email":"dechalier3@hhs.gov","gender":"Non-binary"},
{"id":"5","first_name":"Mala","last_name":"Duffus","email":"mduffus4@pbs.org","gender":"Agender"},
{"id":"6","first_name":"Hendrick","last_name":"Roony","email":"hroony5@free.fr","gender":"Male"},
{"id":"7","first_name":"Randie","last_name":"Ogan","email":"rogan6@google.com.hk","gender":"Agender"},
{"id":"8","first_name":"Nobie","last_name":"Garron","email":"ngarron7@bloglines.com","gender":"Agender"},
{"id":"9","first_name":"Lenard","last_name":"Giannassi","email":"lgiannassi8@zdnet.com","gender":"Male"},
{"id":"10","first_name":"Freeman","last_name":"Witch","email":"fwitch9@sun.com","gender":"Male"}];


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


