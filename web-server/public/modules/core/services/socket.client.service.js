'use strict';

angular.module('core').factory('HSocket', function () {
    var service = {};

    var pomelo = window.pomelo;

    var getConnector = function (uid, callback) {
        var route = 'gate.gateHandler.queryEntry';
        pomelo.init({host: window.location.hostname, port: 3014, log: true}, function () {
            pomelo.request(route, {uid: uid}, function (data) {
                pomelo.disconnect();
                if (callback) callback(data);
            });
        });
    };

    service.connect = function (uid, passwd, callback) {
        var route = 'connector.entryHandler.login';
        getConnector(uid, function (data) {
            pomelo.init({host: data.host, port: data.port, log: true}, function(){
                pomelo.request(route, {uid: uid, password: passwd}, function(message){
                    if (message.code !== 200){
                        //if message.code !== 200 that mean is user and passwd is wrong
                        pomelo.disconnect();
                    }
                    if (callback) callback(message);
                });
            });
        });
    };

    service.send = function(message, callback){
        var route = 'message.messageHandler.sendMessage';
        pomelo.request(route, { hb: 'hb' }, function (data) {
        });
    };

    return service;
});
