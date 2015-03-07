var FeedParser = require('feedparser')
  , mongoose = require('mongoose')
  , async = require('async')
  , schedule = require('node-schedule')
  , read = require('node-readability')
  , request = require('request');

var Article = require('./models/article');

var FEED_URL = "http://rss.sina.com.cn/news/marquee/ddt.xml";

var rule = new schedule.RecurrenceRule();
rule.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50 , 55];

schedule.scheduleJob(rule, function() {
  console.log('fetch again');
  var req = request(FEED_URL)
    , feedparser = new FeedParser();

  req.on('error', function (error) {
    // handle any request errors
  });
  req.on('response', function (res) {
    var stream = this;

    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

    stream.pipe(feedparser);
  });

  feedparser.on('error', function(error) {
    // always handle errors
  });
  feedparser.on('readable', function() {
    // This is where the action is!
    var stream = this
      , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
      , item;

    while (item = stream.read()) {
      (function(article) {

        async.waterfall([
          function(cb) {
            Article.findOne({guid: article.guid}, cb);
          }, function(existed, cb) {
            if (existed) return cb("已经存在这个article了");

            var link = article.link;
            var url = link.substr(link.indexOf('url=')+4);

            read(url, cb);
          }, function(parsed, meta, cb) {
            article.content = parsed.content;
            var newArticle = new Article(article);
            newArticle.save(cb);
          }], function(err, savedArticle) {
            if (err) return console.log(err);
            console.log("保存"+article.guid);
          });
      }(item));
    }
  });

});



