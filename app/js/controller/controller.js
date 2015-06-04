angular.module('chatapp.controller', [])
/***
 *
 */
	.controller('MainCtrl', ['$scope', '$location', '$anchorScroll', '$interval', '$timeout', 'RoomService', 'UserService', function ($scope, $location, $anchorScroll, $interval, $timeout, RoomService, UserService) {


		//EXAMPLE

		//Use Roomservice to call the api that calls mongoose that calls mongodb ;)
		$scope.rooms = RoomService.get();
		console.log($scope.rooms);

		$scope.users = UserService.get();
		console.log($scope.users);

		UserService.create({name: 'Salzburg from angular!!'});




		$scope.goTo = function ( path ) {
		  $location.path( path );
		};




		var socket = io.connect('http://localhost:1337');

	// on connection to server, ask for user's name with an anonymous callback
	socket.on('connect', function(){
		// call the server-side function 'adduser' and send one parameter (value of prompt)
		socket.emit('adduser', prompt("What's your name?"));
	});

	// listener, whenever the server emits 'updatechat', this updates the chat body
	socket.on('updatechat', function (username, data) {
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
	socket.on('updateusers', function(data, room) {
		$('#users').empty();
		$.each(data, function(key, value) {
			$('#users').append('<div class="user"><strong>' + key + '</strong> in ' + room + '</div>');

		});
	});

	// listener, whenever the server emits 'updaterooms', this updates the room the client is in
	socket.on('updaterooms', function(rooms, current_room) {
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
	socket.on('updateuserifRoomSwitched', function(user, room){

		if($('.user:contains("'+user+'")').length > 0){
			$('.user:contains("'+user+'")').remove();
			$("#users").append('<div class="user"><strong>' + user + '</strong> in '+ room + '</div>');
		}
	});

	// displaying the username on topleft
	socket.on('displayUsername', function(username){
		$("#name").append(" - "+ username +"");
	});

	// function for switching a room. Every a tag (in line 99) of a room has a onclick attribute
	// this one is called here
	function switchRoom(room){
		socket.emit('switchRoom', room);
	}

	// on load of page
	$(function(){
		// when the client clicks SEND
		$('#datasend').click( function() {
			if($("#data").val() !== ""){
				var message = $('#data').val();
				$('#data').val('');
				// tell server to execute 'sendchat' and send along one parameter
				socket.emit('sendchat', message);
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
				socket.emit('createRoom', newRoomMember);
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




	});



	}])

	.controller('HomeController', ['$scope', '$location', '$anchorScroll', '$interval', '$timeout', 'RoomService', 'UserService', function ($scope, $location, $anchorScroll, $interval, $timeout, RoomService, UserService) {



	}])


	.controller('RoomController', ['$scope', '$sce', '$location', '$anchorScroll', '$interval', '$timeout', 'ResultService', 'RoomService', 'UserService', function ($scope, $sce, $location, $anchorScroll, $interval, $timeout, ResultService, RoomService, UserService) {





	}])
	;
