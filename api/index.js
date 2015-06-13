"use strict";

var express = require('express');
var router = express.Router();

// require the apis of room and user
var room = require("./room");
var user = require("./user");

// set routes (bundles the routes from the user and rooms folder)
router.use("/api/room", room);
router.use("/api/user", user);


module.exports = router;
