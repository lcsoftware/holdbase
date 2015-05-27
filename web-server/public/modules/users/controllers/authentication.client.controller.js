'use strict';

angular.module('users').controller('AuthenticationController', 
    ['$scope', '$state', '$http', '$location', 'Authentication', 'HSocket',
 function ($scope, $state, $http, $location, Authentication, HSocket) {
    $scope.authentication = Authentication;
    // If user is signed in then redirect back home
    if ($scope.authentication.user) $location.path('/');

    $scope.signup = function () {
        if ($scope.credentials.password !== $scope.credentials.verifyPassword) {
            $scope.error = 'the password and verifyPassword must be same!';
            return;
        }

        $http.post('/auth/signup', $scope.credentials)
            .success(function (response) {
                HSocket.connect($scope.credentials.username, $scope.credentials.password, function (data) {
                    if (data.code === 500) {
                        $scope.error = data.message;
                    } else {
                        $scope.authentication.user = data.user;
                        $state.go('listBenches'); 
                    }
                });
            })
            .error(function (response) {
                $scope.error = response.message;
            });
    };

    $scope.signin = function () {
        $http.post('/auth/signin', $scope.credentials).success(function(response){
            HSocket.connect($scope.credentials.username, $scope.credentials.password, function (data) {
                if (data.code !== 200) {
                    $scope.error = data.message;
                } else {
                    $scope.authentication.user = data.user;
                    console.log(data.user);
                    $state.go('settings.profile');
                }
            });
        }).error(function(response){
            $scope.error = response.message;
        });
    };
}]);