"use strict";

//handles user create/delete + raumzuweisung???

var router = require("express").Router();
var urlRoot = router.route( "/" );

var User = require("./user").model;


urlRoot.get( function(req, res ) {
    User.find( {}, function( err, users ){
        if ( err ) {
            console.log( "wasn't able to get Users", err );
            res.send( err );
        } else {
            if ( users === null ) {
                users = [];
            }
            res.send( users );
        }
    });
});

urlRoot.post( function(req, res) {
  //new user

  var user = new User({
    name: req.body.name,
  });

  user.save( function(err) {
      if (err) {
        if ( err.code === 11000 || err.code === 84 ) {
            res.status(500).send( {"error": "user allready exists"} );
        } else {
            console.log( "error while creating user ", err );
            res.status(500).send( err );
        }
      } else {
          res.status(200).end();
      }
  });
});


var urlName = router.route( "/:name" );

//delete user
urlName.delete( function( req, res ) {
  //req.params.name

  User.findOne( {name: req.params.name} ).remove( function(err) {
        if ( err ) {
            console.log("wasn't able to remove User ", err);
        } else {
            res.status( 200 ).end();
        }
    });
});


module.exports = router;
