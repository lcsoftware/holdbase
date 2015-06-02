'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

 var DiscussionSchema = new Schema({
 	displayName: {
 		type: String
 	},
 	creater: {
 		type: Schema.ObjectId,
 		ref: 'User'
 	},
 	members: [{
 		type: Schema.ObjectId,
 		ref: 'User'
 	}],
 	created: {
        type: Date,
        default: Date.now
    }
 });