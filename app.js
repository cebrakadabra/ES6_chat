"use strict";
/*
	****************************************
	Chat Backend
	Autoren: Eberl Christoph & Bernhard Zweimüller
	****************************************
*/

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    bodyParser = require( "body-parser" ),
    mongoose = require( "mongoose" );

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// import and bind api
var api = require("./api");
app.use(api);


// set our port
var port = process.env.PORT || 1337;

// use of static files
app.use(express.static(__dirname + '/dist/public'));
app.use('/partials', express.static(__dirname + '/dist/partials'));
app.use('/fonts', express.static(__dirname + '/dist/fonts'));
app.use('/images', express.static(__dirname + '/dist/images'));

// routing
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});


// let server listen on port
server.listen(port);
console.log("\n$ *** SERVER SETUP *** $");
console.log("Magic happens on localhost:"+port);

// rooms which are currently available in chat
// var rooms = ['Österreich','Salzburg','Wien'];

// expose app
exports = module.exports = app;



// usernames which are currently connected to the chat
var usernames = {};




io.sockets.on('connection', function (socket) {

  var rooms = [];
  var connection = null;

  // connect to database
  connection = mongoose.createConnection( 'mongodb://localhost/ES6chat2015CEBZ');

  // get rooms from database
  connection.on("open", function() {
    // read rooms
    var collection = connection.db.collection('rooms');
    collection.find().toArray(function(err, roomNames) {
        for(var i = 0; i < roomNames.length; i++){
          rooms.push(roomNames[i].name);
        }
    });
  });








	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	});

	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username, roomName){

		if (username === "") {
		    // user pressed OK, but the input field was empty
		    console.log("User has no username!");
		} else if (username) {
			socket.emit('displayUsername', username);
		    // user typed something and hit OK
		    // we store the username in the socket session for this client
			socket.username = username;
			// store the room name in the socket session for this client
			//socket.room = selected Room from UI
      socket.room = roomName;

			// add the client's username to the global list
			usernames[username] = username;
			// send client to room 1
			socket.join(roomName);
			// echo to client they've connected
			socket.emit('updatechat', 'SERVER', 'you have connected');
			// echo globally (all clients) that a person has connected
			socket.broadcast.to(roomName).emit('updatechat', 'SERVER', username + ' has connected');
			socket.emit('updaterooms', rooms, roomName);
			// update the list of users in chat, client-side
			io.sockets.emit('updateusers', usernames, socket.room);

      console.log(usernames);

		} else {
		    // user hit cancel
		    console.log("The user hit cancel!");
		}
	});

	// if the user wants to switch the room ....
	socket.on('switchRoom', function(newroom){
		// leave the current room (stored in session)
		socket.leave(socket.room);
		// join new room, received as function parameter
		socket.join(newroom);
		socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
		// sent message to OLD room
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
		// update socket session room title
		socket.room = newroom;
		socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
		socket.emit('updaterooms', rooms, newroom);
		socket.broadcast.emit('updateuserifRoomSwitched', socket.username, newroom);
		socket.emit('updateuserifRoomSwitched', socket.username, newroom);
	});

	// If you want to add additional Chatrooms
	socket.on('createRoom', function(newroom){

    //remove
    rooms.push(newroom);

		//socket.emit('updateroomwithnewroom', newroom);
		socket.emit('updaterooms', rooms, socket.room);
		socket.broadcast.emit('updaterooms', rooms, socket.room);
	});


	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
    // remove the username from global usernames list
		delete usernames[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
	});


});
