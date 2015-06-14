"use strict";

var chai = require('chai');

var io = require('socket.io-client');

var app = require('../app').start();


describe("Chat tests", function () {

    var server,
        socket,
        options ={
            transports: ['websocket'],
            'force new connection': true
        };

    beforeEach(function (done) {

        socket = io.connect('http://localhost:1337', {
            'reconnection delay' : 0
            , 'reopen delay' : 0
            , 'force new connection' : true
        });

        socket.on('connected', function() {
            // console.log('connected...');
            done();
        });
        socket.on('disconnect', function() {
            // console.log('disconnected...');
        });

    });


    afterEach(function (done) {

      if(socket.connected) {
          socket.disconnect();
      }

      done();

    });


    it("connect to server", function (done) {

      socket = io.connect('http://localhost:1337', {
          'reconnection delay' : 0
          , 'reopen delay' : 0
          , 'force new connection' : true
      });

      socket.emit("connection", function (client) {
        var message = socket.connected;
        message.should.equal(true);
      });

      done();
    });


    it("add user", function (done) {

      socket.emit('adduser', "Test", "Salzburg");

      socket.on("updatechat", function(status) {
        var message = status;
        message.should.equal("you have connected");
      })

      done();
    });


    it("switch room", function (done) {

      socket.emit('switchRoom', "Wien");

      socket.on("updatechat", function(status) {
        var message = status;
        message.should.equal("you have connected to Wien");
      })

      done();
    });


    it("add room", function (done) {

      socket.emit('createRoom', 'Testroom');

      socket.on("updaterooms", function(rooms) {
        var lastRoom = rooms[rooms.length - 1];;
        lastRoom.should.equal('Testroom');
      })

      done();
    });



 });
