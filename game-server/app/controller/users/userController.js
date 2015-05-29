'use strict';
require('../../models/user.model');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var exports = module.exports;

exports.login = function(username, password, callback) {
    User.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            callback({
                code: 500,
                message: err
            });
            return;
        }
        if (!user) {
            callback({
                code: 500,
                message: username + ' not found!'
            });
            return;
        }
        var hashpwd = user.hashPassword(password);
        if (user.password === hashpwd) {
            callback({
                code: 200,
                message: user
            });
        } else {
            callback({
                code: 500,
                message: 'username/password error!'
            });
        }
    });
}

exports.register = function(user, callback){
  var username = user.username;
  User.findOne({
    username: user.username
  }, function(err, user){
    if (err) callback({code: 500, message: err});
    if (user) callback({code: 500, message: '用户名已经存在'});
    
  })

}