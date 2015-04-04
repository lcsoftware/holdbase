'use strict';

// Benches controller
angular.module('benches').controller('BenchesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Benches',
	function($scope, $stateParams, $location, Authentication, Benches) {
		$scope.authentication = Authentication;

		// Create new Bench
		$scope.create = function() {
			// Create new Bench object
			var bench = new Benches ({
				name: this.name
			});

			// Redirect after save
			bench.$save(function(response) {
				$location.path('benches/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Bench
		$scope.remove = function(bench) {
			if ( bench ) { 
				bench.$remove();

				for (var i in $scope.benches) {
					if ($scope.benches [i] === bench) {
						$scope.benches.splice(i, 1);
					}
				}
			} else {
				$scope.bench.$remove(function() {
					$location.path('benches');
				});
			}
		};

		// Update existing Bench
		$scope.update = function() {
			var bench = $scope.bench;

			bench.$update(function() {
				$location.path('benches/' + bench._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Benches
		$scope.find = function() {
			$scope.benches = Benches.query();
		};

		// Find existing Bench
		$scope.findOne = function() {
			$scope.bench = Benches.get({ 
				benchId: $stateParams.benchId
			});
		};
	}
]);