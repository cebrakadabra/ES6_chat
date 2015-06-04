"use strict";

var mongoose = require( "mongoose" );

var db = require( "../connection.js" );

var userSchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true
  },
  inRoom: { //usefull?
        type: String,
        index: true,
        unique: true
  }
});


module.exports = {
    schema: userSchema,
    model: db.model( "User", userSchema )
};
