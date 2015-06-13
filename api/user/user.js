"use strict";

var mongoose = require( "mongoose" );

// connection to the database
var db = require( "../connection.js" );

// Model for saving users in mongodb
// name is used as (unique) index for this data collection
var userSchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true
  },
  inRoom: {
        type: String
  }
});


module.exports = {
    schema: userSchema,
    model: db.model( "User", userSchema )
};
