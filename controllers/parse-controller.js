var connection = require('../config/database.js');
var request = require('request');
var xml2json = require("node-xml2json");
var responseCode = require('../config/responseCode.js');
exports.getLocation = function(req, res)
{
	//좌표 -> 주소
	var map_x = req.query.mapx;
	var map_y = req.query.mapy;
	var map_query = map_x + "," + map_y;
	if( !map_x || !map_y ) 
	{
		console.log("query error");
		res.json({"responseCode":responseCode.PARSE_LOCATION_FAIL})
	    return;
	}
	request({
	    url: 'https://openapi.naver.com/v1/map/reversegeocode?query=126.922706,37.556242', //URL to hit
	    method: 'GET', //Specify the method
	    headers: { //We can define headers too
	        'Content-Type': 'application/json',
	        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
	        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
	    }
	}, function(err, response, body){
	    if(err) 
	    {
	    	console.log(err);
	    	res.json({"responseCode":responseCode.PARSE_LOCATION_FAIL})
	    	return;
	    }

	    //console.log(response.statusCode, body);
	 	var map_result = JSON.parse(body);
	 	var map_address = map_result.result.items[0].address + " 피시방";
	 	map_address =  encodeURIComponent(map_address);

	 	/*--------------------  PC방 검색시작    ------------------*/
	 	request({
		    url: 'https://openapi.naver.com/v1/search/local.xml?&query=' + map_address, //URL to hit
		    method: 'GET', //Specify the method
		    headers: { //We can define headers too
		        'Content-Type': 'application/json',
		        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
		        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
		    }
		}, function(err, response, body){
		    if(err) 
		    {
		    	console.log(err);
		    	res.json({"responseCode": responseCode.PARSE_LOCATION_FAIL});
		    	return;
		    }
		    console.log(body);
		 	var result = xml2json.parser(body);
		 	///////////\\\\   Item Array  \\\\\\\///////
		 	/*
		 	var items = result.rss.channel.item; 
		 	
		 	for(var i=0; i< items.length; i++)
		 	{
		 		connection.query("SELECT 1 FROM pc_rooms WHERE EXISTS (SELECT 1 FROM pc_rooms WHERE telephone=?) LIMIT 1;", [ items[i].telephone ], function(err, data){
		 			if(err) console.log(err);
		 			console.log(i);
		 			if( !data.length )
		 			{
		 				//데이터 무존재
		 				connection.query("INSERT INTO pc_rooms SET ?;", [items[i]], function(err, result){
		 					if(i == items.length - 1)
		 					{
		 						res.json({"responseCode": responseCode.PARSE_LOCATION_SUCCESS, "locationData": result});
		 						return;
		 					}
		 				})
		 			}
		 		})
		 	}
			*/
		 	res.json({"responseCode": responseCode.PARSE_LOCATION_SUCCESS, "locationData": result});
		 	return;

		});
	});
	
}

