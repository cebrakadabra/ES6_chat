// This will include ./node_modules/angular/angular.js
// and give us access to the `angular` global object.
require('angular');
require('angular-ui-router');
require('angular-route');
// require('angular-animate');

// ES6 imports
// *************
// Import Controllers
import { MainCtrl } from './controller/MainCtrl';
import { RoomController } from './controller/RoomController';
import { ChatController } from './controller/ChatController';

// Import Services
import { UserService } from './services/UserService';
import { RoomService } from './services/RoomService';



// Create your app
let chatapp = angular.module('chatApp',
  [
    'ngRoute',
    /* 'ngAnimate', */
    /* 'chatapp.controller',*/
    /* 'chatapp.services', */
    'chatapp.directives'
  ])
  .controller('MainCtrl', MainCtrl)
  .controller('RoomController', RoomController)
  .controller('ChatController', ChatController)
  .service('UserService', UserService)
  .service('RoomService', RoomService);

// Configuration
chatapp.config(function($logProvider){
  $logProvider.debugEnabled(false);
});

chatapp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/chat', {
        templateUrl: 'partials/chat.html',
        controller: 'ChatController'
      }).
      when('/rooms', {
        templateUrl: 'partials/room.html',
        controller: 'RoomController'
      }).
      otherwise({
        redirectTo: '/rooms'
      });
  }]);

// Run
chatapp.run(function($log){
  $log.debug("test debug");
});
