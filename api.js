var express = require('express');
var routines = require('./api/routines');

var app = express();

app.use('/routines', routines);

module.exports = app;
