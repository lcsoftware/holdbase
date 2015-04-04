'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Bench Schema
 */
var BenchSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Bench name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Bench', BenchSchema);