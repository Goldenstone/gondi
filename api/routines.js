var express = require('express');
var Routine = require('../models/routine');

var app = express();

app.get('/', function(req, res) {
  Routine.find(function(err, routines) {
    if (err) return res.status(500).json({ message: err });

    res.status(200).json(routines);
  });
});

module.exports = app;

