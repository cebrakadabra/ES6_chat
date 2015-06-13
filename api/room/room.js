"use strict";

var mongoose = require("mongoose");

// connection to the database
var db = require("../connection.js");

// Model for saving chatrooms in mongodb
// name is used as (unique) index for this data collection
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
