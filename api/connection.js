"use strict";

var mongoose = require( "mongoose" );

var connection = null;

var connectToDb = function() {

  connection = mongoose.createConnection( 'mongodb://localhost/ES6chat2015CEBZ', { //todo
    server: {
        socketOptions: {
            keppAlive: 1 //For long running applictions it is often prudent to enable keepAlive. Without it, after some period of time you may start to see "connection closed" errors for what seems like no reason.
        }
    }
  });
}

//connect to the db
connectToDb();

//error while connectiong to the db
connection.on("error", function(error) {
    console.log("Error - connection to the database is not possible", error);
});

//when disconnected -> trying to connect again
connection.on("disconnected", function() {
    console.log("Error - trying to reconnect...");
    connectToDb();
});

connection.on("open", function() {
    console.log("Connection to database successful!");


    var roomarray = [{name: "Salzburg"}, {name: "Bayern"}, {name: "Wien"}, {name: "Tirol"}, {name: "Burgenland"}];
    connection.db.collectionNames(function (err, names) {
        // names contains an array of objects that contain the collection names

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
            // TODO: handle error
        } else {
            console.log("- Insert initial rooms");
            console.info('- %d rooms were successfully added as default.', docs.length);
        }
    }
});

module.exports = connection;
