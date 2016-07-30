var connection = require('../config/database.js');
var responseCode = require('../config/responseCode.js');

exports.getArticles = function(req, res)
{
	connection.query("SELECT * FROM articles;", function(err, result){
			if(err)
			{
				console.log(err);
				res.json({"responseCode": responseCode.GET_ARTICLE_FAIL});
				return;
			}

			res.json({"responseCode": responseCode.GET_RESERVATION_SUCCESS, "articleData": result});
			return;
		})
}

exports.createArticle = function(req, res)
{
	var articleData = {};
	articleData.title = req.body.title;
	if( !articleData.title )
	{
		res.json({"responseCode": responseCode.MAKE_ARTICLE_FAIL});
		return;
	}

	connection.query("INSERT INTO articles SET ?;", [articleData], function(err, data){
		if(err) 
		{
			console.log(err);
			res.json({"responseCode": responseCode.MAKE_ARTICLE_FAIL});
			return;
		}

		connection.query("SELECT * FROM articles;", function(err, result){
			if(err)
			{
				console.log(err);
				res.json({"responseCode": responseCode.MAKE_ARTICLE_FAIL});
				return;
			}

			res.json({"responseCode": responseCode.MAKE_ARTICLE_SUCCESS, "articleData": result});
			return;
		})
	})
}