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

  console.log(req);
  console.log(res);


  var user = new User();
  user.name = req.body.name;
  user.inRoom = req.body.inRoom; //room name

  user.save( function(err) {
      if (err) {
          console.log("cannot create new user ", err);
          res.send(err);
      } else {
          res.status(200).end();
      }
  });
});


//delete user


module.exports = router;
