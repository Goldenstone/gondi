var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function(req, res) {
  var MEDIA_PATH = process.env.MEDIA_PATH || './public/videos';
  fs.readdir(MEDIA_PATH, function(err, files) {
    files = files || [];
    var validFileNames = [];
    console.log(files);
    files.forEach(function(name) {
      var tmp = name.split('.');
      var type = tmp[tmp.length-1]; 
      if (type === 'mp4') {
        validFileNames.push(name);
      }
    });
    res.render('videos', { files: validFileNames });
  });
});

module.exports = app;
