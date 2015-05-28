angular.module('chatapp.controller', [])
/***
 *
 */
	.controller('MainCtrl', ['$scope', '$location', '$anchorScroll', '$interval', '$timeout', function ($scope, $location, $anchorScroll, $interval, $timeout) {



		$scope.goTo = function ( path ) {
		  $location.path( path );
		};



	}])

	.controller('HomeController', ['$scope', '$location', '$anchorScroll', '$interval', '$timeout', function ($scope, $location, $anchorScroll, $interval, $timeout) {



	}])


	.controller('RoomController', ['$scope', '$sce', '$location', '$anchorScroll', '$interval', '$timeout', 'ResultService', function ($scope, $sce, $location, $anchorScroll, $interval, $timeout, ResultService) {





	}])
	;
