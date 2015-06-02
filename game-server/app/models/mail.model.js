'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MailSchema = new Schema {
    subject: {
        type: String
    },
    from: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    to: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    cc: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    body: {
        type: String
    },
    sendAt: {
        type: Date
    }
    createAt: {
        type: Date,
        default: Date.now
    }
};


mongoose.model('Mail', MailSchema);