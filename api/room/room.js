"use strict";

var mongoose = require( "mongoose" );

var db = require( "../connection.js" );

var roomSchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true
  }
});

module.exports = {
    schema: roomSchema,
    model: db.model( "Room", roomSchema )
};
