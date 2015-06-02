'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CompanySchema = new Schema {
	name : {
		type: String,
		unique: '公司名称已经存在',
		required: '必须填写公司名称',
		trim: true
	},
	administrator: {
		type: String,
		unique: '管理员账户已经被占用',
		required: '请输入管理员账号'
	},
	password: {
		type: String,
		default: '',
	},
	domain: {
		type: String,
		trim: true
	},
	contacts: {
		type: String
	},
	tel: {
		type: String
	},
	address: {
		type: String
	},
	flag: {type: Number},
	updated: {
		type: Date,
	},
	created: {
		type: Date,
		default: Date.now
	}
};

/**
 * Hook a pre save method to hash the password
 */
CompanySchema.pre('save', function(next) {
    if (this.password && this.password.length > 6) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});
/**
 * Create instance method for hashing a password
 */
CompanySchema.methods.hashPassword = function(password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
    } else {
        return password;
    }
};

mongoose.model('Company', CompanySchema);