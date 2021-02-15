var Client = require('../models/client_model');
var mongoose = require('mongoose');

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

module.exports = {

    //clients list
    get_clients_list: function(req, res) {
		  res.status(200).send(clients)
    } 
}