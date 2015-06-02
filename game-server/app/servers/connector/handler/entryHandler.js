var userController = require('../../../controller/users/userController');

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

Handler.prototype.pushSession = function(key, value, session) {
    session.set(key, value);
    session.push(key, function(err) {
        if (err) {
            console.error('set default for session service failed! error is : %j', err.stack);
        }
    });
}

/// user login
Handler.prototype.login = function(msg, session, next) {
    var self = this;
    var username = msg.uid;
    var password = msg.password;
    console.log(msg);
    userController.login(username, password, function(data) {
        if (data.code !== 200) {
            next(null, data);
            return;
        }

        var sessionService = self.app.get('sessionService');
        ///duplicate login
        if (!!sessionService.getByUid(username)) {
            next(null, {
                code: 500,
                message: 'you already login'
            });
            return;
        }
        session.bind(msg.username);
        self.pushSession('hb', 'hb', session);

        session.on('closed', onUserLeave.bind(null, self.app));

        //put user into channel
        self.app.rpc.user.userRemote.add(session, username, self.app.get('serverId'), 'hb', true, function(users) {
            delete data.password
            next(null, {
                code: 200,
                user: data.message,
                users: users
            });
        });
    });
}

/// user register
Handler.prototype.register = function(msg, session, next) {
    var username = msg.uid;
    var password = msg.password;

}

/// user login
Handler.prototype.login = function(msg, session, next) {



        /**
         * User log out handler
         *
         * @param {Object} app current application
         * @param {Object} session current session object
         *
         */
        var onUserLeave = function(app, session) {
            if (!session || !session.uid) {
                return;
            }
            app.rpc.user.userRemote.kick(session, session.uid, app.get('serverId'), session.get('hb'), null);
        };

        /**
         * New client entry.
         *
         * @param  {Object}   msg     request message
         * @param  {Object}   session current session object
         * @param  {Function} next    next step callback
         * @return {Void}
         */
        Handler.prototype.entry = function(msg, session, next) {
            next(null, {
                code: 200,
                msg: 'game server is ok.'
            });
        };

        /**
         * Publish route for mqtt connector.
         *
         * @param  {Object}   msg     request message
         * @param  {Object}   session current session object
         * @param  {Function} next    next step callback
         * @return {Void}
         */
        Handler.prototype.publish = function(msg, session, next) {
            var result = {
                topic: 'publish',
                payload: JSON.stringify({
                    code: 200,
                    msg: 'publish message is ok.'
                })
            };
            next(null, result);
        };

        /**
         * Subscribe route for mqtt connector.
         *
         * @param  {Object}   msg     request message
         * @param  {Object}   session current session object
         * @param  {Function} next    next step callback
         * @return {Void}
         */
        Handler.prototype.subscribe = function(msg, session, next) {
            var result = {
                topic: 'subscribe',
                payload: JSON.stringify({
                    code: 200,
                    msg: 'subscribe message is ok.'
                })
            };
            next(null, result);
        };