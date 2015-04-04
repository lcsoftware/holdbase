'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Bench = mongoose.model('Bench'),
	_ = require('lodash');

/**
 * Create a Bench
 */
exports.create = function(req, res) {
	var bench = new Bench(req.body);
	bench.user = req.user;

	bench.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bench);
		}
	});
};

/**
 * Show the current Bench
 */
exports.read = function(req, res) {
	res.jsonp(req.bench);
};

/**
 * Update a Bench
 */
exports.update = function(req, res) {
	var bench = req.bench ;

	bench = _.extend(bench , req.body);

	bench.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bench);
		}
	});
};

/**
 * Delete an Bench
 */
exports.delete = function(req, res) {
	var bench = req.bench ;

	bench.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bench);
		}
	});
};

/**
 * List of Benches
 */
exports.list = function(req, res) { 
	Bench.find().sort('-created').populate('user', 'displayName').exec(function(err, benches) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(benches);
		}
	});
};

/**
 * Bench middleware
 */
exports.benchByID = function(req, res, next, id) { 
	Bench.findById(id).populate('user', 'displayName').exec(function(err, bench) {
		if (err) return next(err);
		if (! bench) return next(new Error('Failed to load Bench ' + id));
		req.bench = bench ;
		next();
	});
};

/**
 * Bench authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.bench.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
