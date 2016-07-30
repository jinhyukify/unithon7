var express = require('express');
var app = express();
var router = require('./router/router')(app);

//require('./config/database.js').connect();

var server = app.listen(8080, function(){
	console.log("TEST EXPRESS");
})
