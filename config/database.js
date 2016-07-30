var mysql = require('mysql');
var connection = mysql.createConnection({
	host	:  process.env.MYSQL_HOST,
	user 	:  process.env.MYSQL_ID,
	password:  process.env.MYSQL_PASSWORD,
	database: 'unithon'
});

connection.connect(function(err){
	if(err) {
		console.log("MYSQL Connecting Error" + err.stack);	
		return;
	}
});

module.exports = connection;