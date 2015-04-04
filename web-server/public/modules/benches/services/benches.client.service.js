'use strict';

//Benches service used to communicate Benches REST endpoints
angular.module('benches').factory('Benches', ['$resource',
	function($resource) {
		return $resource('benches/:benchId', { benchId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);