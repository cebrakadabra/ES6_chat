"use strict";

var mongoose = require( "mongoose" );

var connection = null;

var connectToDb = function() {

  // opening the connection via mongoose to the mongodb
  connection = mongoose.createConnection( 'mongodb://localhost/ES6chat2015CEBZ', {
    server: {
        socketOptions: {
            keppAlive: 1 //For long running applictions it is often prudent to enable keepAlive. Without it, after some period of time you may start to see "connection closed" errors for what seems like no reason.
        }
    }
  });
}

//connect to the db
connectToDb();

//an error occurred while connectiong to the db
connection.on("error", function(error) {
    console.log("Error - connection to the database is not possible", error);
});

//when disconnected -> automatically trying to reconnect again
connection.on("disconnected", function() {
    console.log("Error - trying to reconnect...");
    connectToDb();
});

// connection was successful
connection.on("open", function() {
    console.log("Connection to database successful!");


    // default rooms to populate the database with
    var roomarray = [{name: "Salzburg"}, {name: "Bayern"}, {name: "Wien"}, {name: "Tirol"}, {name: "Burgenland"}];
    connection.db.collectionNames(function (err, names) {
        // names contains an array of objects that contain the collection names

        // delete all old records (to start with a clean db)
        for(var i = 0; i < names.length; i++){
          if(names[i].name === 'users'){
            connection.collections['users'].drop( function(err) {
              console.log("\n$ *** USERS SETUP *** $");
                console.log('- Old users collection dropped');
            });
          }
          else if(names[i].name === 'rooms'){
            connection.collections['rooms'].drop( function(err) {
                console.log("\n$ *** ROOMS SETUP *** $");
                console.log('- Old rooms collection dropped');
                connection.collection('rooms').insert(roomarray, onInsert);
            });
          } else{
            connection.collection('rooms').insert(roomarray, onInsert);
          }
        }
    });


    function onInsert(err, docs) {
        if (err) {
            console.log("Error an inser");
        } else {
            console.log("- Insert initial rooms");
            console.info('- %d rooms were successfully added as default.', docs.length);
        }
    }
});

module.exports = connection;
