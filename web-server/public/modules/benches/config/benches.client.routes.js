'use strict';

//Setting up route
angular.module('benches').config(['$stateProvider',
	function($stateProvider) {
		// Benches state routing
		$stateProvider.
		state('listBenches', {
			url: '/benches',
			templateUrl: 'modules/benches/views/list-benches.client.view.html'
		}).
		state('createBench', {
			url: '/benches/create',
			templateUrl: 'modules/benches/views/create-bench.client.view.html'
		}).
		state('viewBench', {
			url: '/benches/:benchId',
			templateUrl: 'modules/benches/views/view-bench.client.view.html'
		}).
		state('editBench', {
			url: '/benches/:benchId/edit',
			templateUrl: 'modules/benches/views/edit-bench.client.view.html'
		});
	}
]);