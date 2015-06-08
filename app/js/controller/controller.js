angular.module('chatapp.controller', [])
/***
 *
 */
	.controller('MainCtrl', ['$scope', '$location', '$anchorScroll', '$interval', '$timeout', 'RoomService', 'UserService', function ($scope, $location, $anchorScroll, $interval, $timeout, RoomService, UserService) {

		// $scope.users = UserService.get();
		// console.log($scope.users);

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

		$scope.users = [];
		$scope.currentroom = null;
		$scope.roomlist = [];



	$scope.username = null;
	$scope.actualroom = null;




	}])

	.controller('ChatController', ['$scope', '$location', '$anchorScroll', '$interval', '$timeout', 'RoomService', 'UserService', function ($scope, $location, $anchorScroll, $interval, $timeout, RoomService, UserService) {



		$scope.socket = io.connect('http://localhost:1337');

		// on connection to server, ask for user's name with an anonymous callback
		$scope.socket.on('connect', function(){

			// $scope.socket.emit('adduser', $scope.newUser.name, $scope.newUser.room);

			// only for DEV -- user will be retrieved from window before then (Rooms, as well as romm itself)
			var date = new Date();
			var name = "Steve "+date;
			$scope.$apply(function(){
				$scope.newUser.name = name;
			});
			$scope.socket.emit('adduser', name, "Salzburg");

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

			// $('#conversation').append('<b>'+username + ':</b><br> ' + data + '<br><span style="color: #00f;"><em><small>['+datetime+'] </small></em></span><br><hr><br>');
			if(username === $scope.newUser.name){
				$("#conversation").append("<div class='chatright'><span class='rightext'>"+username+"</span><br><div class='bubble bubbleright'>"+data+"</div></div>");
			} else if(username === "SERVER"){
				$("#conversation").append("<div class='middle'><div class='middlebubble'>"+username+": "+data+"</div></div>");
			} else{
				$("#conversation").append("<div class='chatleft'>"+username+"<br><div class='bubble bubbleleft'>"+data+"</div></div>");
			}




			// var objDiv = document.getElementById("conversation");
			// objDiv.scrollTop = objDiv.scrollHeight;
		});






		// listener, whenever the server emits 'updateusers', this updates the username list
		$scope.socket.on('updateusers', function(data, room) {
			// $('#users').empty();
			$scope.users = [];
			$.each(data, function(key, value) {
				// $('#users').append('<div class="user"><strong>' + key + '</strong> in ' + room + '</div>');
				$scope.$apply(function(){
					$scope.users.push({name: key, room: room});
				});

			});
		});





		// listener, whenever the server emits 'updaterooms', this updates the room the client is in
		$scope.socket.on('updaterooms', function(rooms, current_room) {
			// $('#rooms').empty();
			$scope.roomlist = [];
			$.each(rooms, function(key, value) {
				if(value == current_room){
					// $('#rooms').append('<div>' + value + '</div>');
					$scope.$apply(function(){
						$scope.currentroom = null;
						$scope.currentroom = value;
					});
				}
				else {
					// $('#rooms').append('<div><a href="#" ng-click="switchRoom(\''+value+'\')">' + value + '</a></div>');
					$scope.$apply(function(){
						$scope.roomlist.push(value);
					});
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
		$scope.switchRoom = function(room){
			$scope.socket.emit('switchRoom', room);
		};

		$scope.sendMessage = function(message){
			if(message !== ""){
				$("#data").val('');
				$scope.socket.emit('sendchat', message);
			}
		};

		// on load of page
		// $(function(){
			// when the client clicks SEND
			// $('#datasend').click( function() {
			// 	if($("#data").val() !== ""){
			// 		var message = $('#data').val();
			// 		$('#data').val('');
			// 		// tell server to execute 'sendchat' and send along one parameter
			// 		$scope.socket.emit('sendchat', message);
			// 	}
			// });

			// when the client hits ENTER on their keyboard
			// $('#data').keypress(function(e) {
			// 	if(e.which == 13) {
			// 		$(this).blur();
			// 		if($("#data").val() !== ""){
			// 			$('#datasend').focus().click();
			// 		}
			//
			// 	}
			// });

			// click function for a new room
			// $("#createnewroom").click(function(){
			// 	if($("#newroominput").val() !== ""){
			// 		var newRoomMember = $("#newroominput").val();
			// 		$scope.socket.emit('createRoom', newRoomMember);
			// 		$("#newroominput").val('');
			// 	}
			//
			// });

			$scope.createNewRoom = function(newroom){
				if(newroom !== ""){
					$scope.socket.emit('createRoom', newroom);
					$("#newroominput").val('');
				}
			};

			// keypress function for creating a new room
			// $("#newroominput").keypress(function(e) {
			// 	if(e.which == 13) {
			// 		$(this).blur();
			// 		if($("#newroominput").val() !== ""){
			// 			$('#createnewroom').focus().click();
			// 		}
			//
			// 	}
			// });




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
			$location.path("/chat");
		};



	}])
	;
