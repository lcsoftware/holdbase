'use strict';

angular.module('core').factory('HSocket', function () {
    var service = {};

    var pomelo = window.pomelo;

    var queryEntry = function (uid, callback) {
        var route = 'gate.gateHandler.queryEntry';
        pomelo.init({host: window.location.hostname, port: 3014, log: true}, function () {
            pomelo.request(route, {uid: uid}, function (data) {
                pomelo.disconnect();
                if (callback) callback(data);
            });
        });
    };

    service.connect = function (uid, passwd, callback) {
        var route = 'connector.entryHandler.enter';
        queryEntry(uid, function (data) {
            pomelo.init({host: data.host, port: data.port, log: true}, function(){
                pomelo.request(route, {uid: uid, password: passwd}, function(message){
                    //if message.code !== 200 that mean is user and passwd is wrong
                    if (message.code !== 200) pomelo.disconnect();
                    if (callback) callback(message);
                });
            });
        });
    }

    service.send = function(message, callback){
        pomelo.send(message, callback);
    }

    return service;
});