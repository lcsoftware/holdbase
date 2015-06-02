'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', 'Authentication', 'HSocket', 'HHttp',
    function($scope, $state, $http, $location, Authentication, HSocket, HHttp) {
        $scope.authentication = Authentication;
        // If user is signed in then redirect back home
        if ($scope.authentication.user) $location.path('/');

        $scope.signup = function() {
            if ($scope.credentials.password !== $scope.credentials.verifyPassword) {
                $scope.error = '两次密码输入不一致!';
                return;
            }

            HHttp.post('/auth/signup', $scope.credentials, function(data) {
                if (data.code === 500) {
                    $scope.error = data.message;
                } else {
                    $state.go('signin');
                }
            }, function(data) {
                $scope.error = data.message;
            });
        };

        $scope.signin = function() {
           HSocket.login($scope.credentials.username, $scope.credentials.password, function(data){
                if (data.code === 200){
                    $scope.authentication.user = data.user;
                    $state.go('listBenches');
                } else {
                    $scope.error = data.message;
                }
           }); 
        };
    }
]);