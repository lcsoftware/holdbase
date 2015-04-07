'use strict';

var userRemote = require('../remote/userRemote');
var userController = require('../../../controller/users/userController');


module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;


};

Handler.prototype.pushSession = function(key, value, session) {
	session.set(key, value);
		session.push(key, function(err){
			if (err) {
					console.error('set default for session service failed! error is : %j', err.stack);
			}
		});
}


Handler.prototype.login = function(msg, session, next) {
	var self = this;
	var username = msg.username;
	var password = msg.password;
	userController.login(username, password, function(data){
			if (data.code !== 200){ next(data); }

			var sessionService = self.app.get('sessionService');
			///duplicate login
			if (!!sessionService.getByUid(username)) {
				next(null, {code: 500, message: 'you already login'});
				return;
			}
			session.bind(msg.username);
			self.pushSession('hb', 'hb', session);

			session.on('closed', onUserLeave.bind(null, self.app));

			//put user into channel
			self.app.rpc.user.userRemote.add(session, uid, self.app.get('serverId'), rid, true, function(users){
				next(null, { users:users });
			});
	});
}


/**
 * User log out handler
 *
 * @param {Object} app current application
 * @param {Object} session current session object
 *
 */
var onUserLeave = function(app, session) {
	if(!session || !session.uid) {
		return;
	}
	app.rpc.user.userRemote.kick(session, session.uid, app.get('serverId'), session.get('hb'), null);
};
