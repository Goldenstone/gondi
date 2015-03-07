var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
    title      : String,
    link: String,
    content: String,
    author: String,
    guid: String,
    pubDate: String
});

module.exports = mongoose.model('Article', articleSchema);
