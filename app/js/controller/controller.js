angular.module('chatapp.controller', [])
/***
 *
 */
	.controller('MainCtrl', ['$scope', '$location', '$anchorScroll', '$interval', '$timeout', 'RoomService', 'UserService', function ($scope, $location, $anchorScroll, $interval, $timeout, RoomService, UserService) {

		$scope.users = UserService.get();
		console.log($scope.users);

		//delete a user
		UserService.delete("berni"); //with username (is unique)
		// UserService.create({name: 'chris4'});

		//Use Roomservice to call the api that calls mongoose that calls mongodb ;)
		$scope.roomservice = RoomService;
		$scope.roomservice.getRooms();
		$scope.rooms = $scope.roomservice.roomdata;


		$scope.newUser = {
			name: null,
			room: null
		};

		$scope.goTo = function ( path ) {
		  $location.path( path );
		};




	$scope.username = null;




	}])

	.controller('ChatController', ['$scope', '$location', '$anchorScroll', '$interval', '$timeout', 'RoomService', 'UserService', function ($scope, $location, $anchorScroll, $interval, $timeout, RoomService, UserService) {



		$scope.socket = io.connect('http://localhost:1337');

		// on connection to server, ask for user's name with an anonymous callback
		$scope.socket.on('connect', function(){
			// call the server-side function 'adduser' and send one parameter (value of prompt)
			// $scope.socket.emit('adduser', prompt("What's your name?"));

			// only for DEV -- user will be retrieved from window before then (Rooms, as well as romm itself)
			$scope.socket.emit('adduser', "Steve");
		});

		// listener, whenever the server emits 'updatechat', this updates the chat body
		$scope.socket.on('updatechat', function (username, data) {
			var currentdate = new Date();
			var datetime = "Last Sync: " + currentdate.getDate() + "/" +
											(currentdate.getMonth()+1)  + "/" +
											currentdate.getFullYear() + " @ " +
											currentdate.getHours() + ":" +
											currentdate.getMinutes() + ":" +
											currentdate.getSeconds();

			$('#conversation').append('<b>'+username + ':</b><br> ' + data + '<br><span style="color: #00f;"><em><small>['+datetime+'] </small></em></span><br><hr><br>');
			var objDiv = document.getElementById("conversation");
			objDiv.scrollTop = objDiv.scrollHeight;
		});






		// listener, whenever the server emits 'updateusers', this updates the username list
		$scope.socket.on('updateusers', function(data, room) {
			$('#users').empty();
			$.each(data, function(key, value) {
				$('#users').append('<div class="user"><strong>' + key + '</strong> in ' + room + '</div>');

			});
		});





		// listener, whenever the server emits 'updaterooms', this updates the room the client is in
		$scope.socket.on('updaterooms', function(rooms, current_room) {
			$('#rooms').empty();
			$.each(rooms, function(key, value) {
				if(value == current_room){
					$('#rooms').append('<div>' + value + '</div>');
				}
				else {
					$('#rooms').append('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
				}
			});
		});

		// listener, if a user switches the room, the view should be updated
		$scope.socket.on('updateuserifRoomSwitched', function(user, room){

			if($('.user:contains("'+user+'")').length > 0){
				$('.user:contains("'+user+'")').remove();
				$("#users").append('<div class="user"><strong>' + user + '</strong> in '+ room + '</div>');
			}
		});

		// displaying the username on topleft
		$scope.socket.on('displayUsername', function(username){
			// $("#name").append(" - "+ username +"");
			$scope.$apply(function(){
				$scope.username = username;
			});

		});


		// function for switching a room. Every a tag (in line 99) of a room has a onclick attribute
		// this one is called here
		function switchRoom(room){
			$scope.socket.emit('switchRoom', room);
		}

		// on load of page
		// $(function(){
			// when the client clicks SEND
			$('#datasend').click( function() {
				if($("#data").val() !== ""){
					var message = $('#data').val();
					$('#data').val('');
					// tell server to execute 'sendchat' and send along one parameter
					$scope.socket.emit('sendchat', message);
				}
			});

			// when the client hits ENTER on their keyboard
			$('#data').keypress(function(e) {
				if(e.which == 13) {
					$(this).blur();
					if($("#data").val() !== ""){
						$('#datasend').focus().click();
					}

				}
			});

			// click function for a new room
			$("#createnewroom").click(function(){
				if($("#newroominput").val() !== ""){
					var newRoomMember = $("#newroominput").val();
					$scope.socket.emit('createRoom', newRoomMember);
					$("#newroominput").val('');
				}

			});

			// keypress function for creating a new room
			$("#newroominput").keypress(function(e) {
				if(e.which == 13) {
					$(this).blur();
					if($("#newroominput").val() !== ""){
						$('#createnewroom').focus().click();
					}

				}
			});




		// });


	}])


	.controller('RoomController', ['$scope', '$sce', '$location', '$anchorScroll', '$interval', '$timeout', 'RoomService', 'UserService', function ($scope, $sce, $location, $anchorScroll, $interval, $timeout, RoomService, UserService) {
		// //Use Roomservice to call the api that calls mongoose that calls mongodb ;)
		// $scope.rooms = RoomService.get();
		// console.log($scope.rooms);



		// User callback, checks on existance of current user
		$scope.checkUser = function(param, username){
			if(param){
				console.log("User fine");
				$scope.newUser.name = username;
				$(".rooms").fadeIn();

			} else{
				console.log("User already exists");
				$(".usererror").fadeIn();
				$timeout(function(){
					$(".usererror").fadeOut();
				}, 2500);
			}
		};

		$scope.setUser = function(username){
			UserService.create({name: username}, $scope.checkUser);
		};

		$scope.selectRoom = function(room){
			$scope.newUser.room = room;
		};



	}])
	;
