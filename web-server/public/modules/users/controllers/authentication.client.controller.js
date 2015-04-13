'use strict';

angular.module('users').controller('AuthenticationController',
    ['$scope', '$http', '$location', 'Authentication', 'HSocket',
        function ($scope, $http, $location, Authentication, HSocket) {
            $scope.authentication = Authentication;
            // If user is signed in then redirect back home
            if ($scope.authentication.user) $location.path('/');

            $scope.signup = function () {
                if ($scope.credentials.password !== $scope.credentials.verifyPassword) {
                    $scope.error = 'the password and verifyPassword must be same!';
                    return;
                }

                $http.post('/auth/signup', $scope.credentials).success(function (response) {
                    HSocket.queryEntry(response.username, response.password, function (data) {
                        if (data.d.code === 500) {
                            $scope.error = data.d.message;
                        } else {
                            $scope.authentication.user = data.d.message;
                            $location.path('/benches');
                        }
                    });
                }).error(function (response) {
                    $scope.error = response.message;
                });
            };

            $scope.signin = function () {
                HSocket.connect($scope.credentials.username, $scope.credentials.password, function (data) {
                    if (data.d.code !== 200) {
                        $scope.error = data.d.message;
                    } else {
                        $scope.authentication.user = data.d.message.user;
                        $location.path('/benches');
                    }
                });
            };
        }
    ]);
