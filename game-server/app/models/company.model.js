'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema

var CompanySchema = new Schema {
	name : {
		type: String,
		unique: 'company already exists',
		required: 'Please fill in a company name',
		trim: true
	},
	admin: [{type: Schema.ObjectId, ref: 'User'}],
	domain: {
		type: String,
		trim: true
	},
	flag: {type: Number},
	created: {
		type: Date,
		default: Date.now
	}
}

mongoose.model('Company', CompanySchema);