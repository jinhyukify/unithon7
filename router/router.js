var user = require('../controllers/user-controller.js')
var parse = require('../controllers/parse-controller.js')
module.exports = function(app) {
	app.get('/api/test', user.test);
	app.get('/api/parse/location', parse.getLocation);
}