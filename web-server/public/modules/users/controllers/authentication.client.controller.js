'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function ($scope, $http, $location, Authentication) {
	    $scope.authentication = Authentication;
	    // If user is signed in then redirect back home
	    if ($scope.authentication.user) $location.path('/');

	    $scope.signup = function () { 
	        if ($scope.credentials.password !== $scope.credentials.verifyPassword) {
	            $scope.error = 'the password and verifyPassword must be same!';
	            return;
	        }

	        $http.post('/auth/signup', $scope.credentials).success(function(response) {
	        	$scope.authentication.user = response;
	        	$location.path('/');
	        }).error(function(response) {
	        	$scope.error = response.message;
	        });
	    };

	    $scope.signin = function () {
			console.log($scope.credentials);
	        $http.post('/auth/signin', $scope.credentials).success(function (response) {
	            $scope.authentication.user = response;
	            $location.path('/');
	        }).error(function (response) {
	            $scope.error = response.message;
	        });
	    };
	}
]);
