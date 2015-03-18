var express = require('express');
var app = express();
var fs = require('fs');

var MEDIA_PATH = process.env.MEDIA_PATH || './public/videos';

app.param('seriesid', function(req, res, next, seriesid) {
  var file = new Buffer(seriesid, 'hex').toString();
  req.seriesName = file;
  next();
});

app.get('/', function(req, res) {
  fs.readdir(MEDIA_PATH+'/series', function(err, files) {
    files = files || [];
    res.render('series', { files: files });
  });
});

app.get('/:seriesid', function(req, res){
  var seriesName = req.seriesName;
  fs.readdir(MEDIA_PATH+'/series/'+seriesName, function(err, files) {
    files = files || [];
    res.render('single_series', {name: seriesName, files: files });
  });
});

module.exports = app;
