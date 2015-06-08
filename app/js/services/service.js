angular.module('chatapp.services', [])
/***
 *
 */

	.factory('RoomService', ['$interval', '$filter', '$http',  function($interval, $filter, $http){

		var rooms = {
			data: null
		};

		var roomdata = [];

		// call to get all rooms
		var getRooms = function getRooms(){
			$http({
				method: 'GET',
				url: '/api/room'
			})
			.success(function(data, status, headers, config) {
				rooms.data = data;
				for(var i = 0; i < rooms.data.length; i++){
					console.log(rooms.data[i].name);
					roomdata.push(rooms.data[i].name);
				}
			})
			.error(function(data, status, headers, config) {
				console.log("error");
				console.log(status);
			});
		};


		// call to POST and create a new room
		var createRoom = function createRoom(roomName){
			console.log(roomName);
			return $http.post('/api/room', roomName);
		};

		var deleteRoom = function deleteRoom(id){
			return $http.delete('/api/room/' + id);
		};

		return {
				getRooms : getRooms,
				createRoom: createRoom,
				deleteRoom: deleteRoom,
				roomdata: roomdata
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
				create : function(userData, callback) {

						var test = $http({
							method: 'POST',
							url: '/api/user',
							data: userData
							})
						.success(function(data, status, headers, config) {
							console.log(status);
							// bool.value = true;
							callback(true, userData.name);
						})
						.error(function(data, status, headers, config) {
							console.log(status);
							// bool.value = false;
							callback(false, null);
						});

				},

				// call to DELETE a user
				delete : function(name) {
						return $http.delete('/api/user/' + name);
				}
		};
	}]);
