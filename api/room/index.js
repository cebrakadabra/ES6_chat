"use strict";

//handles all the routes for getting/setting/deleting chatrooms

var router = require("express").Router();
var urlRoot = router.route( "/" );

// using mongoose models
var Room = require("./room").model;
var User = require( "../user/user" ).model;


// Handling GET Requests (/api/room)
urlRoot.get( function( req, res ) {

  // connection to db via mongoose
  Room.find( {}).exec(function(err, rooms){
        if (err) {
            console.log( "cannot get Rooms", err );
            res.send( err );
        } else {
            // console.log(rooms);
            if ( rooms === null ) {
                rooms = [];
            }
            res.send(rooms);
        }
    });

});

urlRoot.post( function( req, res) {
  //new room

  var room = new Room({
    name: req.body.name,
  });

  // connection to db via mongoose
  room.save( function(err) {
      if (err) {
        if ( err.code === 11000 || err.code === 84 ) {
            // if a room name exists - special handling for error messages
            res.status(500).send( {"error": "room allready exists"} );
        } else {
          // default error message
            console.log( "error while creating room ", err );
            res.status(500).send( err );
        }
      } else {
          res.status(200).end();
      }
  });
});


urlName.delete( function( req, res ) {
  console.log("remove room");
  //req.params.name

  // connection to db via mongoose
  Room.findOne( {name: req.params.name} ).remove( function(err) {
        if ( err ) {
            console.log("wasn't able to remove Room ", err);
        } else {
            console.log("Room removed");
            res.status( 200 ).end();
        }
    });
});


module.exports = router;
