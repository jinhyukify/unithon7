var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//require('./config/database.js').connect();
var router = require('./router/router')(app);


var server = app.listen(8080, function(){
	console.log("TEST EXPRESS");
})
