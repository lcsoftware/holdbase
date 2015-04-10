'use strict';

var userRemote = require('../remote/userRemote');


module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};
