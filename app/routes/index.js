'use strict';

let controller = require('../controllers/index');

module.exports = function (app) {

	app.route('/getUser')
	    .get(controller.getUser);
}
