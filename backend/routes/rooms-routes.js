var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const jwt = require('jsonwebtoken');


router.get("/", (req, res, next) => {
  //res.render('room', { roomId: req.params.room })
  console.log('rooms ready');
  res.send('Rooms Ready')
});

router.get("/:room", (req, res, next) => {
  res.render('room', { roomId: req.params.room })  //THIS GRABS THE URL OF THE ROOM LOOKING TO BE MADE
  console.log('rooms ready');
  res.send('Room Found')
});


module.exports = router;
