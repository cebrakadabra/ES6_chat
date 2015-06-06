// This will include ./node_modules/angular/angular.js
// and give us access to the `angular` global object.
require('angular');
require('angular-ui-router');
require('angular-route');
// require('angular-animate');


// Create your app
var chatapp = angular.module('chatApp',
	[
		'ngRoute',
		/* 'ngAnimate', */
    'chatapp.controller',
		'chatapp.services',
		'chatapp.directives',

	]);

// Configuration
chatapp.config(function($logProvider){
	$logProvider.debugEnabled(false);
});

chatapp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/main.html',
				controller: 'HomeController'
      }).
			when('/room', {
        templateUrl: 'partials/room.html',
				controller: 'RoomController'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);

// Run
chatapp.run(function($log){
	$log.debug("test debug");
});