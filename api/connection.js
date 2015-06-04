"use strict";

var mongoose = require( "mongoose" );

var connection = null;

var connectToDb = function() {
  connection = mongoose.createConnection( 'mongodb://localhost/chat', { //todo
    server: {
        socketOptions: {
            keppAlive: 1 //For long running applictions it is often prudent to enable keepAlive. Without it, after some period of time you may start to see "connection closed" errors for what seems like no reason.
        }
    }
  });

  //check for entries and populate initial rooms??
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
    connect();
});

connection.on("open", function() {
    console.log("Connection to database successful!");
});

module.exports = connection;
