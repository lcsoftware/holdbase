'use strict';

// Configuring the Articles module
angular.module('benches').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Menus.addMenuItem('topbar', 'Benches', 'benches', 'dropdown', '/benches(/create)?');
		//Menus.addSubMenuItem('topbar', 'benches', 'List Benches', 'benches');
		//Menus.addSubMenuItem('topbar', 'benches', 'New Bench', 'benches/create');
	}
]);