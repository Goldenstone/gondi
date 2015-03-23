var express = require('express');
var app = express();
var Article = require('../models/article');

app.param('id', function(req, res, next, id) {
  Article.findById(id, function(err, a) {
    if (err || !a) return res.status(400).json({message: 'err'});
    req.article = a;
    next();
  });

});

app.get('/', function(req, res) {
  console.log('hi');
  Article.find().limit(20).exec(function(err, articles) {
    if (err) return res.status(400).json({message: 'err'});
    res.render('infos', {articles: articles});
  });
});

app.get('/:id', function(req, res) {
  var article = req.article;
  res.render('info', {article: article});
});

module.exports = app;
