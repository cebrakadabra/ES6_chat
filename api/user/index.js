"use strict";

//handles user get/create/delete

var router = require("express").Router();
var urlRoot = router.route( "/" );

// using mongoose models
var User = require("./user").model;


// Handling GET Requests (/api/room)
urlRoot.get( function(req, res ) {

  // connection to db via mongoose
    User.find( {}, function( err, users ){
        if ( err ) {
            console.log( "wasn't able to get Users", err );
            res.send( err );
        } else {
            if ( users === null ) {
                users = [];
            }

            //return the users
            res.send( users );
        }
    });
});

// Handling POST Requests (/api/room)
urlRoot.post( function(req, res) {

  // create a new user (based on the mongoose User model)
  var user = new User({
    name: req.body.name,
    inRoom: req.body.inRoom
  });

  // connection to db via mongoose
  user.save( function(err) {
      if (err) {
        if ( err.code === 11000 || err.code === 84 ) {
            // if a username exists - special handling for error messages
            res.status(500).send( {"error": "user allready exists"} );
        } else {
            // default error message
            console.log( "error while creating user ", err );
            res.status(500).send( err );
        }
      } else {
          res.status(200).end();
      }
  });
});


// url definition for existing users
var urlName = router.route( "/:name" );

// delete a user
urlName.delete( function( req, res ) {

  // connection to db via mongoose
  User.findOne( {name: req.params.name} ).remove( function(err) {
        if ( err ) {
            console.log("wasn't able to remove User ", err);
        } else {
            res.status( 200 ).end();
        }
    });
});


module.exports = router;
