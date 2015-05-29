'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', 'Authentication', 'HSocket', 'hbHttp',
    function($scope, $state, $http, $location, Authentication, HSocket, hbHttp) {
        $scope.authentication = Authentication;
        // If user is signed in then redirect back home
        if ($scope.authentication.user) $location.path('/');

        $scope.signup = function() {
            if ($scope.credentials.password !== $scope.credentials.verifyPassword) {
                $scope.error = '两次密码输入不一致!';
                return;
            }

            hbHttp.post('/auth/signup', $scope.credentials, function(data) {
                if (data.code === 500) {
                    $scope.error = data.message;
                } else {
                    $scope.authentication.user = data.user;
                    $state.go('listBenches');
                }
            }, function(data) {
                $scope.error = data.message;
            });


            /*
            $http.post('/auth/signup', $scope.credentials).success(function(response) {
                    HSocket.connect($scope.credentials.username, $scope.credentials.password, function(data) {
                        if (data.code === 500) {
                            $scope.error = data.message;
                        } else {
                            $scope.authentication.user = data.user;
                            $state.go('listBenches');
                        }
                    });
                })
                .error(function(response) {
                    $scope.error = response.message;
                });*/
        };

        $scope.signin = function() {
            hbHttp.post('/auth/signin', $scope.credentials, function(data) {
                $scope.authentication.user = data.user;
                $state.go('listBenches');
            }, function(err) {
                $scope.error = err.message;
            });
            /*
            $http.post('/auth/signin', $scope.credentials).success(function(response) {
                HSocket.connect($scope.credentials.username, $scope.credentials.password, function(data) {
                    if (data.code !== 200) {
                        $scope.error = data.message;
                    } else {
                        $scope.authentication.user = data.user;
                        console.log(data.user);
                        $state.go('settings.profile');
                    }
                });
            }).error(function(response) {
                $scope.error = response.message;
            });*/
        };
    }
]);