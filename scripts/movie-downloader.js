var _ = require('underscore');
var Download = require('download');
var phantom = require('phantom');
var async = require('async');
var fs = require('fs');

var urls = [
["北京房事", "http://v.youku.com/v_show/id_XMjY4MTk2MDYw.html"],
["类似爱情", "http://v.youku.com/v_show/id_XNzg5ODY5OTg0.html"],
["被偷走的那五年", "http://v.youku.com/v_show/id_XNjI1NDM0NzE2.html"],
["猩球崛起:黎明之战", "http://v.youku.com/v_show/id_XODQxMjc0OTg0.html"],
["熔炉", "http://v.youku.com/v_show/id_XNjE0NjEyMTQw.html"],
["飞越老人院", "http://v.youku.com/v_show/id_XNDI5NjU1MTQ4.html"],
["赢家", "http://v.youku.com/v_show/id_XMjYwNDA0ODY0.html"],
["新天生一对", "http://v.youku.com/v_show/id_XMzU5NDM3MjY4.html"],
["我的早更女友", "http://v.youku.com/v_show/id_XODcwOTE3MDI0.html"],
["昆虫总动员", "http://v.youku.com/v_show/id_XODE0NzU4MjY4.html"],
["芭比", "http://v.youku.com/v_show/id_XNzM4OTI3MTk2.html"],
["乱青春", "http://v.youku.com/v_show/id_XODUwMzM2NTk2.html"],
["心花路放", "http://v.youku.com/v_show/id_XODMzOTcyNjg0.html"],
["这就是我", "http://v.youku.com/v_show/id_XNDY4ODg5MTcy.html"],
["鬼朋友", "http://v.youku.com/v_show/id_XNzA3MzQ0MzQ0.html"],
["老魔术师", "http://v.youku.com/v_show/id_XNDQxODQ3NTg4.html"],
["黄金时代", "http://v.youku.com/v_show/id_XODI5Njk0MjQw.html"],
["勇敢爱 ——美好2012", "http://v.youku.com/v_show/id_XNTI5MTE0OTI0.html"],
["魁拔3战神崛起", "http://v.youku.com/v_show/id_XODQ3Mzc4Mjg0.html"],
["古惑仔之人在江湖", "http://v.youku.com/v_show/id_XNDI5NDU5MzYw.html"],
["古惑仔2之猛龙过江", "http://v.youku.com/v_show/id_XNDI5NDkwNzIw.html"],
["鹿鼎记2:神龙教", "http://v.youku.com/v_show/id_XMzUyMzE2NTg4.html"],
["古惑仔之友情岁月山鸡故事", "http://v.youku.com/v_show/id_XNDI5OTg3MTIw.html"],
["假如爱有天意", "http://v.youku.com/v_show/id_XMTkxNTA0NTMy.html"],
["古惑仔5之龙争虎斗", "http://v.youku.com/v_show/id_XNDI5NTI2NjYw.html"],
["死神来了", "http://v.youku.com/v_show/id_XMjAyMzAxMDYw.html"],
["海洋", "http://v.youku.com/v_show/id_XMzUzMjM5OTg0.html"],
["女生日记", "http://v.youku.com/v_show/id_XMzIxODkzMTIw.html"],
["赛德克·巴莱", "http://v.youku.com/v_show/id_XNDI2Mjc3NjE2.html"],
["大话西游之仙履奇缘", "http://v.youku.com/v_show/id_XMTk3MjA0MjIw.html"],
["英雄本色", "http://v.youku.com/v_show/id_XNzk4OTY0ODIw.html"],
["裸归", "http://v.youku.com/v_show/id_XNzkzMDM0ODUy.html"],
["幻影车神:魔盗激情", "http://v.youku.com/v_show/id_XNzYxNTk3OTQ4.html"],
["拯救大兵瑞恩", "http://v.youku.com/v_show/id_XMjAyNTIxOTEy.html"],
["喜剧之王", "http://v.youku.com/v_show/id_XNTY0MDUwNDk2.html"],
["性爱之后", "http://v.youku.com/v_show/id_XODUwNzQxMTA4.html"],
["梁亮亮和谢小星的简单故事", "http://v.youku.com/v_show/id_XMjQ5NzM4MjM2.html"],
["入侵华尔街", "http://v.youku.com/v_show/id_XODU5NTE3MzA0.html"],
["热血高校3", "http://v.youku.com/v_show/id_XODcxMjAxOTYw.html"],
["倩女幽魂2:人间道", "http://v.youku.com/v_show/id_XODA3MjIzMjcy.html"],
["精武门", "http://v.youku.com/v_show/id_XNzk5MDg2MzY0.html"],
["倩女幽魂3:道道道", "http://v.youku.com/v_show/id_XODAxMTQ5NDc2.html"],
["不能说的秘密", "http://v.youku.com/v_show/id_XMTk4MzMwNjQw.html"],
["最遥远的距离", "http://v.youku.com/v_show/id_XNTkzMjM5Mjgw.html"],
["驯龙高手", "http://v.youku.com/v_show/id_XNTM5NTcyMDQ0.html"],
["浪客剑心", "http://v.youku.com/v_show/id_XNTE4OTMwMzIw.html"],
["移动迷宫", "http://v.youku.com/v_show/id_XODgwNTcyNzQ4.html"],
["明日边缘", "http://v.youku.com/v_show/id_XNzY1MDk2NDMy.html"],
["拉贝日记", "http://v.youku.com/v_show/id_XNDcxNTYxNDEy.html"],
];

var getYoukuUrl = function(page, name, infoUrl, callback) {
  console.log(arguments);
  console.log('getting youku url: ', infoUrl);
  page.open(infoUrl, function(status){
    console.log('opened website? '+status);
    page.evaluate(function() {
      var node = document.querySelector('.btnShow.btnplayposi');
      console.log(node?'success':'fail');
      return node?node.href:null
    }, function(link) {
      console.log('youku link is: '+link);
      callback(null, page, name, link);
    });
  });
};

var getYoukuxiaUrl = function(page, name, url, callback) {
  callback(null, page, name, url && url.replace('.youku.', '.youkuxia.'));
}

var downloadFile = function(page, name, feilvUrl, callback) {
  console.log('feilv link is: '+feilvUrl);
  if (!feilvUrl) callback(null);
  page.open(feilvUrl, function() {
    page.evaluate(function () {
      return document.querySelector('#result .furl').href;
    }, function(url) {
      console.log('downloading '+name);
      var download = new Download()
        .get(url)
        .dest('videos/')
        .rename(name+'.mp4');

      download.run(function(err, files){
        if (err) {
          console.log(err);
        }else{
          console.log(name+' downloaded successfully!');
        }
        callback(null);
      });
    });
  });
};

phantom.create(function(ph) {
  ph.createPage(function(page){  
    async.eachSeries(urls, function(tuple, singleMovieFinished){
      var movieName = tuple[0];
      var infoUrl = tuple[1];

      if (fs.existsSync('videos/'+movieName+'.mp4')) return singleMovieFinished(null);

      console.log('trying '+movieName);

      async.waterfall([
        function(cb) {
          cb(null, page, movieName, infoUrl);
        },
        // getYoukuUrl,
        getYoukuxiaUrl,
        downloadFile
        ], singleMovieFinished);

    }, function(err){
      page.close();
      ph.exit();
      if (err) return console.log('err'+err);
      console.log('all finished!');      
    });
  })
});