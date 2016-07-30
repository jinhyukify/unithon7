var user = require('../controllers/user-controller.js');
var parse = require('../controllers/parse-controller.js');
var pc = require('../controllers/pc-controller.js');
var article = require('../controllers/article-controller.js');
module.exports = function(app) {
	app.get('/api/test', user.test);
	app.get('/api/parse/location', parse.getLocation);
	app.get('/api/reservation', pc.getReservation);
	app.post('/api/reservation', pc.makeReservation);
	app.get('/api/article', article.getArticles);
	app.post('/api/article', article.createArticle);
}