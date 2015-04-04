'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var benches = require('../../app/controllers/benches.server.controller');

	// Benches Routes
	app.route('/benches')
		.get(benches.list)
		.post(users.requiresLogin, benches.create);

	app.route('/benches/:benchId')
		.get(benches.read)
		.put(users.requiresLogin, benches.hasAuthorization, benches.update)
		.delete(users.requiresLogin, benches.hasAuthorization, benches.delete);

	// Finish by binding the Bench middleware
	app.param('benchId', benches.benchByID);
};
