'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var FolderSchema = new Schema ({
	name: {type: String},
	owner: {type: Schema.ObjectId, ref: 'User'},
	flag: {type: Number}
});

mongoose.model('Folder', FolderSchema);