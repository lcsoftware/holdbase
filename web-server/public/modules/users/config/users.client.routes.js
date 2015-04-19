'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		var settings = {
			name: 'settings',
			abstract: true,
			url: '/settings',
			templateUrl: 'modules/users/views/settings/settings.client.view.html'
		};

		var profile = {
			name: 'settings.profile',
			url: '/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		};
		
		var password= {
			name: 'settings.password',
			url: '/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		};

		var signup = {
			name: 'signup',
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		};

		var signin = {
			name: 'signin',
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		};

		var forgot = {
			name: 'forgot',
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		};
		var resetInvalid= {
			name: 'reset-invalid',
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		};

		var resetSuccess= {
			name: 'reset-success',
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		};

		var reset = {
			name: 'reset',
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		};

		$stateProvider
			.state(settings)
			.state(profile)
			.state(password)
			.state(signup)
			.state(signin)
			.state(forgot)
			.state(resetInvalid)
			.state(resetSuccess)
			.state(reset);
	}
]);