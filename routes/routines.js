var express = require('express');
var app = express();
var Routine = require('../models/routine');

app.get('/', function(req, res) {
  console.log('hi');
  Routine.find({}, function(err, routines) {
    if (err) return res.status(400).json({message: 'err'});
    res.render('routines', {routines: routines});
  });
});

module.exports = app;
