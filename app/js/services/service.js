// OLD ES5 SERVICE MODULE
angular.module('chatapp.services', [])
/***
 *
 */

	// .factory('RoomService', ['$interval', '$filter', '$http',  function($interval, $filter, $http){
	//
	// 	let rooms = {
	// 		data: null
	// 	};
	//
	// 	let roomdata = [];
	//
	// 	// Call to get all Rooms via the Mongoose API
	// 	let getRooms = function getRooms(){
	//
	// 		//GET Request
	//
	// 		$http({
	// 			method: 'GET',
	// 			url: '/api/room'
	// 		})
	// 		.success(function(data, status, headers, config) {
	// 			rooms.data = data;
	// 			for(let i = 0; i < rooms.data.length; i++){
	// 				roomdata.push(rooms.data[i].name);
	// 			}
	// 		})
	// 		.error(function(data, status, headers, config) {
	// 			console.log("error");
	// 			console.log(status);
	// 		});
	// 	};
	//
	//
	// 	// Call to insert a new Room into the database via Mongoose API
	// 	let createRoom = function createRoom(roomName){
	//
	// 		//POST Request
	//
	// 		console.log(roomName);
	// 		return $http.post('/api/room', roomName);
	// 	};
	//
	// 	// Call to delete a single Room in the database via Mongoose API
	// 	let deleteRoom = function deleteRoom(id){
	//
	// 		//DELETE Request
	//
	// 		return $http.delete('/api/room/' + id);
	// 	};
	//
	// 	return {
	// 			getRooms : getRooms,
	// 			createRoom: createRoom,
	// 			deleteRoom: deleteRoom,
	// 			roomdata: roomdata
  //   };
	//
	// }])

	// .factory('UserService', ['$interval', '$filter', '$http',  function($interval, $filter, $http){
	// 	return {
	//
	// 			// Call to get all Users via the Mongoose API
	// 			get : function() {
	//
	// 			//GET Request
	//
	// 			let data_array = [];
	//
	// 			$http({
	// 			      method: 'GET',
	// 			      url: '/api/user'
	// 			    })
	// 			    .success(function(data, status, headers, config) {
	// 			      let rooms = data;
	//
	// 			      for(let i = 0; i < rooms.length; i++){
	// 			        data_array.push(rooms[i]);
	// 			      }
	// 			    })
	// 			    .error(function(data, status, headers, config) {
	// 			      console.log("error");
	// 			      console.log(status);
	// 			    });
	//
	// 					return {
	// 						data_array: data_array
	// 					};
	// 			},
	//
	// 			// Call to insert a new User into the database via Mongoose API
	// 			create : function(userData, callback) {
	//
	// 					//POST Request
	//
	// 					$http({
	// 						method: 'POST',
	// 						url: '/api/user',
	// 						data: userData
	// 						})
	// 					.success(function(data, status, headers, config) {
	// 						console.log(status);
	// 						// bool.value = true;
	// 						callback(true, userData.name);
	// 					})
	// 					.error(function(data, status, headers, config) {
	// 						console.log(status);
	// 						// bool.value = false;
	// 						callback(false, null);
	// 					});
	//
	// 			},
	//
	// 			// Call to delete a single User in the database via Mongoose API
	// 			delete : function(name) {
	//
	// 					//DELETE Request
	//
	// 					return $http.delete('/api/user/' + name);
	// 			}
	// 	};
	// }])
	;
