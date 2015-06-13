"use strict";

var mongoose = require( "mongoose" );

var db = require( "../connection.js" );

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
