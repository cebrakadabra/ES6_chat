"use strict";

var mongoose = require( "mongoose" );

var db = require( "../connection.js" );

var roomSchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
});

module.exports = {
    schema: roomSchema,
    model: db.model( "Room", roomSchema )
};
