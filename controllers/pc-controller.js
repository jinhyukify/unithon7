var connection = require('../config/database.js');
var xml2json = require("node-xml2json");
var responseCode = require('../config/responseCode.js');
exports.makeReservation = function(req, res)
{
	var reservationData = {};
	reservationData.title = req.body.title;
	reservationData.pc_room = req.body.pc_room;
	reservationData.member_count = req.body.member_count;	
	if( !reservationData.title || !reservationData.pc_room || !reservationData.member_count )
	{
		res.json({"responseCode": responseCode.MAKE_RESERVATION_FAIL});
		return;
	}

	connection.query("INSERT INTO reservation SET ?;", [reservationData], function(err, data){
		if(err) 
		{
			console.log(err);
			res.json({"responseCode": responseCode.MAKE_RESERVATION_FAIL});
			return;
		}

		connection.query("SELECT * FROM reservation;", function(err, result){
			if(err)
			{
				console.log(err);
				res.json({"responseCode": responseCode.MAKE_RESERVATION_FAIL});
				return;
			}

			res.json({"responseCode": responseCode.MAKE_RESERVATION_SUCCESS, "reservationData": result});
			return;
		})
	})
}

exports.getReservation = function(req, res)
{
	connection.query("SELECT * FROM reservation;", function(err, result){
			if(err)
			{
				console.log(err);
				res.json({"responseCode": responseCode.GET_RESERVATION_FAIL});
				return;
			}

			res.json({"responseCode": responseCode.GET_RESERVATION_SUCCESS, "reservationData": result});
			return;
		})
}