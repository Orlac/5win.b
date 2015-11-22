(function(window){
	'use strict';
	
	// Это все есть в dependencies
	
	// Libs
	// window.jQuery = window.$ = require('jquery');
	// require('bootstrap');
	// window.angular = require('angular');
	// require('angular-ui-bootstrap');
	// require('angular-ui-router');
	// require('angular-resource');
	// require('lodash');
	
	
	// CSS
	require('../../node_modules/bootstrap/dist/css/bootstrap.min.css');
	require('../../node_modules/angular/angular-csp.css');

	// App
	require('./router.js');

	var ng = angular.module('application', [
		'ui.bootstrap',
		'app.router'
	]);

	angular.element(document).ready(function() {
	    angular.bootstrap(document, [ng.name]);
	});


})(window);