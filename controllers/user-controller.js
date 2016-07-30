var connection = require('../config/database.js');
var request = require('request');
var xml2json = require("node-xml2json");

exports.test = function(req, res)
{
	request({
	    url: 'https://openapi.naver.com/v1/map/reversegeocode?query=126.922706,37.556242', //URL to hit
	    method: 'GET', //Specify the method
	    headers: { //We can define headers too
	        'Content-Type': 'application/json',
	        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
	        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
	    }
	}, function(err, response, body){
	    if(err) console.log(err);
	    //console.log(response.statusCode, body);
	 	var map_result = JSON.parse(body);
	 	res.json(map_result.result.items[0].address);
	 	res.end();	
	});
}

