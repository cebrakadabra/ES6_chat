"use strict";

//handles all the routes for getting/setting/deleting chatrooms

var router = require("express").Router();
var urlRoot = router.route( "/" );

var Room = require("./room").model;
var User = require( "../user/user" ).model;

urlRoot.get( function( req, res ) {
  Room.find( {}).exec(function(err, rooms){
        if (err) {
            console.log( "cannot get Rooms", err );
            res.send( err );
        } else {
            console.log(rooms);
            if ( rooms === null ) {
                rooms = [];
            }
            res.send(rooms);
        }
    });

});

urlRoot.post( function( req, res) {
  //new room

  var room = new Room();
  room.name = req.body.name;

  room.save( function(err) {
      if (err) {
          console.log("cannot create new room ", err);
          res.send(err);
      } else {
          res.status(200).end();
      }
  });
});

//url for existing chatrooms
var urlName = router.route( "/:name" );

//get a single room?
urlName.get( function( req, res ) {

});


urlName.delete( function( req, res ) {
  console.log("remove room");
  //req.params.name

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
