angular.module('chatapp.services', [])
/***
 *
 */

	.factory('RoomService', ['$interval', '$filter', '$http',  function($interval, $filter, $http){
		return {
        // call to get all rooms
        get : function() {

					var data_array = [];

					$http({
			      method: 'GET',
			      url: '/api/room'
			    })
			    .success(function(data, status, headers, config) {
			      var rooms = data;

			      for(var i = 0; i < rooms.length; i++){
			        data_array.push(rooms[i]);
			      }
			    })
			    .error(function(data, status, headers, config) {
			      console.log("error");
			      console.log(status);
			    });

					return {
						data_array: data_array
					};
        },

        // call to POST and create a new room
        create : function(roomData) {
						console.log(roomData);
            return $http.post('/api/room', roomData);
        },

        // call to DELETE a room
        delete : function(id) {
            return $http.delete('/api/room/' + id);
        }
    };
	}])

	.factory('UserService', ['$interval', '$filter', '$http',  function($interval, $filter, $http){
		return {
				// call to get all user
				get : function() {

						var data_array = [];

						$http({
				      method: 'GET',
				      url: '/api/user'
				    })
				    .success(function(data, status, headers, config) {
				      var rooms = data;

				      for(var i = 0; i < rooms.length; i++){
				        data_array.push(rooms[i]);
				      }
				    })
				    .error(function(data, status, headers, config) {
				      console.log("error");
				      console.log(status);
				    });

						return {
							data_array: data_array
						};
				},

				// call to POST and create a new user
				create : function(userData) {
						console.log(userData);
						return $http.post('/api/user', userData);
				},

				// call to DELETE a user
				delete : function(name) {
						return $http.delete('/api/user/' + name);
				}
		};
	}]);
