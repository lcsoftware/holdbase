'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var DeptSchema = new Schema {
	name: {
		type: String,
		trim: true
	},
	company: {
		type: Schema.ObjectId,
		ref: 'Company'
	},
	parent {
		type: Schema.ObjectId,
		ref: 'Dept'
	}
	flag: {type: Number}
};

mongoose.model('Dept', DeptSchema);