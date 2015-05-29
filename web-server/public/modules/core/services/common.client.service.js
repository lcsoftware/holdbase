'use strict';

angular.module('core').factory('hbHttp', ['$http', function($http) {
    var service = {};

    service.post = function(url, param, success, err) {
        $http.post(url, param).success(function(data) {
            if (success) success(data);
        }).error(function(data){
        	if (err) err(data);
        });
    };

    return service;
}]);