var _ = require('underscore');
var Download = require('download');
var phantom = require('phantom');
var async = require('async');
var fs = require('fs');

var urls = [
["父亲", "http://www.youku.com/show_page/id_z63805698092811e1a046.html"],
["11度青春", "http://www.youku.com/show_page/id_zac398d46a47011df97c0.html"],
// ["忠犬八公的故事", "http://www.youku.com/show_page/id_zcc14794c962411de83b1.html"],
// ["匆匆那年", "http://www.youku.com/show_page/id_z6538871ec13911e38b3f.html"],
// ["有一个地方只有我们知道", "http://www.youku.com/show_page/id_zd3344b7afc5011e38b3f.html"],
// ["北京房事", "http://www.youku.com/show_page/id_z42239a7a61e111e1b318.html"],
// ["失孤", "http://www.youku.com/show_page/id_z967335909de911e3a705.html"],
// ["狼图腾", "http://www.youku.com/show_page/id_z957ad64abce411e0bf93.html"],
// ["暮光之城4:破晓下", "http://www.youku.com/show_page/id_z929a0de8bce811e0bf93.html"],
// ["她", "http://www.youku.com/show_page/id_zadc2240cffee11e28b3f.html"],
// ["温暖的尸体", "http://www.youku.com/show_page/id_zc29d33e2bcea11e0bf93.html"],
// ["类似爱情", "http://www.youku.com/show_page/id_z5a3e5d3046ee11e4a080.html"],
// ["一生一世", "http://www.youku.com/show_page/id_zde8999ca412111e38b3f.html"],
// ["重返20岁", "http://www.youku.com/show_page/id_z02769222f9b211e38b3f.html"],
// ["博物馆奇妙夜", "http://www.youku.com/show_page/id_zcc0d11c0962411de83b1.html"],
// ["博物馆奇妙夜2", "http://www.youku.com/show_page/id_zcc1286aa962411de83b1.html"],
// ["狂怒", "http://www.youku.com/show_page/id_z7b50fad4662811e3b8b7.html"],
// ["钟馗伏魔:雪妖魔灵", "http://www.youku.com/show_page/id_z780ffbcc97b511e3b8b7.html"],
// ["变形金刚4:绝迹重生", "http://www.youku.com/show_page/id_z28f6432c009211e29498.html"],
// ["马达加斯加的企鹅", "http://www.youku.com/show_page/id_z8fb5018c5bbf11e3b8b7.html"],
// ["冰雪奇缘", "http://www.youku.com/show_page/id_z1191401cd88a11e2a19e.html"],
// ["暮光之城3:月食", "http://www.youku.com/show_page/id_zcc16c9ea962411de83b1.html"],
// ["被偷走的那五年", "http://www.youku.com/show_page/id_z7940aa82d71711e29498.html"],
// ["邂逅幸福", "http://www.youku.com/show_page/id_z5a4dfa60e6ab11e1b2ac.html"],
// ["猩球崛起:黎明之战", "http://www.youku.com/show_page/id_z0006d4a841ce11e3a705.html"],
// ["熔炉", "http://www.youku.com/show_page/id_za4e1f3f6bcea11e0bf93.html"],
// ["素媛", "http://www.youku.com/show_page/id_zae76e3e63c7b11e3b8b7.html"],
// ["星映话 2015", "http://www.youku.com/show_page/id_zeaf6ac08a12811e4abda.html"],
// ["战狼", "http://www.youku.com/show_page/id_z117b9abc00c311e38b3f.html"],
// ["超级特工", "http://www.youku.com/show_page/id_zcc02bd60962411de83b1.html"],
// ["后会无期", "http://www.youku.com/show_page/id_z9f015586984711e3a705.html"],
// ["飞越老人院", "http://www.youku.com/show_page/id_z0246ae4c69c511e1b52a.html"],
// ["赢家", "http://www.youku.com/show_page/id_zf6bcf4d4460a11e0a046.html"],
// ["新青年—优酷出品青年导演扶植计划第六季", "http://www.youku.com/show_page/id_z32173c26e4b211e3a705.html"],
// ["忍者神龟:变种时代", "http://www.youku.com/show_page/id_z43b2e0e2bce811e0bf93.html"],
// ["新天生一对", "http://www.youku.com/show_page/id_zdcc7a6eebcea11e0bf93.html"],
// ["我的早更女友", "http://www.youku.com/show_page/id_z069d8668a5bf11e3a705.html"],
// ["星映话 2014", "http://www.youku.com/show_page/id_z9adc4c38bf8c11e3b8b7.html"],
// ["霍比特人3:五军之战", "http://www.youku.com/show_page/id_zdae7ee941da911e296ac.html"],
// ["分手合约", "http://www.youku.com/show_page/id_z3fb07d50817d11e2a19e.html"],
// ["昆虫总动员", "http://www.youku.com/show_page/id_ze68879be9d2b11e3a705.html"],
// ["泰坦尼克号", "http://www.youku.com/show_page/id_zcc04d1ea962411de83b1.html"],
// ["芭比", "http://www.youku.com/show_page/id_z3b58f712bceb11e0bf93.html"],
// ["乱青春", "http://www.youku.com/show_page/id_zcc127b06962411de83b1.html"],
// ["心花路放", "http://www.youku.com/show_page/id_z5c539c9862d811e38b3f.html"],
// ["敢死队3", "http://www.youku.com/show_page/id_zc9c9e88441d311e38b3f.html"],
// ["这就是我", "http://www.youku.com/show_page/id_z27d790ccb2c711e19498.html"],
// ["七号房的礼物", "http://www.youku.com/show_page/id_z6dd1c90c677c11e2a19e.html"],
// ["神话", "http://www.youku.com/show_page/id_zcc044d06962411de83b1.html"],
// ["速度与激情7", "http://www.youku.com/show_page/id_z12f2f6b041cd11e38b3f.html"],
// ["都嘟", "http://www.youku.com/show_page/id_zbd438d506a4911e4b522.html"],
// ["一九四二", "http://www.youku.com/show_page/id_z0d28be90bceb11e0bf93.html"],
// ["鬼朋友", "http://www.youku.com/show_page/id_z90d59082cf4011e3b8b7.html"],
// ["老魔术师", "http://www.youku.com/show_page/id_z05c630c450fa11e3b8b7.html"],
// ["黄金时代", "http://www.youku.com/show_page/id_zd035b18a910711e296ac.html"],
// ["变形金刚2", "http://www.youku.com/show_page/id_zcc104a8e962411de83b1.html"],
// ["勇敢爱 ——美好2012", "http://www.youku.com/show_page/id_zf2b6ce18bff911e19498.html"],
// ["我的机器人女友", "http://www.youku.com/show_page/id_zcc0d7a3e962411de83b1.html"],
// ["国产凌凌漆", "http://www.youku.com/show_page/id_zcc010510962411de83b1.html"],
// ["王者之心", "http://www.youku.com/show_page/id_zcc009972962411de83b1.html"],
// ["魁拔3战神崛起", "http://www.youku.com/show_page/id_z02b184eac9b611e2b16f.html"],
// ["古惑仔之人在江湖", "http://www.youku.com/show_page/id_zcc00fd0e962411de83b1.html"],
// ["同窗生", "http://www.youku.com/show_page/id_z052859387bcd11e29013.html"],
// ["寂静岭2", "http://www.youku.com/show_page/id_zcc174a64962411de83b1.html"],
// ["狼少年", "http://www.youku.com/show_page/id_z9e2bd1a4ef4711e1b356.html"],
// ["追梦—优酷出品青年导演扶植计划", "http://www.youku.com/show_page/id_z06fed74e1f7611e38b3f.html"],
// ["12.21", "http://www.youku.com/show_page/id_z117d987e42a211e2b16f.html"],
// ["王夫制作系列微电影", "http://www.youku.com/show_page/id_z13a9575a178111e38b3f.html"],
// ["古惑仔2之猛龙过江", "http://www.youku.com/show_page/id_zcc055f34962411de83b1.html"],
// ["钢铁侠3", "http://www.youku.com/show_page/id_zcc1679a4962411de83b1.html"],
// ["了不起的盖茨比", "http://www.youku.com/show_page/id_z28f90858e24711de97c0.html"],
// ["10放", "http://www.youku.com/show_page/id_z00c8ebdc5d7711e3a705.html"],
// ["鹿鼎记2:神龙教", "http://www.youku.com/show_page/id_zcc021982962411de83b1.html"],
// ["天国的邮递员", "http://www.youku.com/show_page/id_zfc8a6fd277df11e296ac.html"],
// ["放牛班的春天", "http://www.youku.com/show_page/id_zcc029268962411de83b1.html"],
// ["小黄人", "http://www.youku.com/show_page/id_ze89c61da5bee11e3b8b7.html"],
// ["泰迪熊", "http://www.youku.com/show_page/id_z12786e04bceb11e0bf93.html"],
// ["倩女幽魂", "http://www.youku.com/show_page/id_zcc01f2ea962411de83b1.html"],
// ["极品飞车", "http://www.youku.com/show_page/id_z87631efcd3ec11e2b16f.html"],
// ["咱们结婚吧", "http://www.youku.com/show_page/id_zba7c5304722311e4abda.html"],
// ["华尔街之狼", "http://www.youku.com/show_page/id_z4a6df49eb32f11df97c0.html"],
// ["古惑仔之友情岁月山鸡故事", "http://www.youku.com/show_page/id_zcc03a00e962411de83b1.html"],
// ["恐怖解剖室", "http://www.youku.com/show_page/id_zcc100ba0962411de83b1.html"],
// ["盲女72小时", "http://www.youku.com/show_page/id_zcc0622de962411de83b1.html"],
// ["将错就错", "http://www.youku.com/show_page/id_z2a9d587a50f711e4b2ad.html"],
// ["假如爱有天意", "http://www.youku.com/show_page/id_zcc00d6c6962411de83b1.html"],
// ["古惑仔5之龙争虎斗", "http://www.youku.com/show_page/id_zcc02d098962411de83b1.html"],
// ["死神来了", "http://www.youku.com/show_page/id_zcc036760962411de83b1.html"],
// ["哈利·波特与死亡圣器上", "http://www.youku.com/show_page/id_zb6511d0067f011e0a046.html"],
// ["海洋", "http://www.youku.com/show_page/id_zcc1363c2962411de83b1.html"],
// ["女生日记", "http://www.youku.com/show_page/id_zb0b48dce9b5111e19498.html"],
// ["赛德克·巴莱", "http://www.youku.com/show_page/id_z22d7ad34861511e18a7d.html"],
// ["大话西游之仙履奇缘", "http://www.youku.com/show_page/id_zcc037a70962411de83b1.html"],
// ["英雄本色", "http://www.youku.com/show_page/id_zcc0360f8962411de83b1.html"],
// ["裸归", "http://www.youku.com/show_page/id_z2a37024a60ac11e4a080.html"],
// ["幻影车神:魔盗激情", "http://www.youku.com/show_page/id_zd62bfbcc4a7e11e38b3f.html"],
// ["屏息", "http://www.youku.com/show_page/id_z4f04e4f43c7a11e3b8b7.html"],
// ["拯救大兵瑞恩", "http://www.youku.com/show_page/id_zcc016d7a962411de83b1.html"],
// ["喜剧之王", "http://www.youku.com/show_page/id_zcc04f3b4962411de83b1.html"],
// ["源代码", "http://www.youku.com/show_page/id_zcc167904962411de83b1.html"],
// ["性爱之后", "http://www.youku.com/show_page/id_z0ef7f4f8bcb811e0bf93.html"],
// ["机械战警", "http://www.youku.com/show_page/id_z21f85ea2ca3c11e1b52a.html"],
// ["北美票房排行榜  2014", "http://www.youku.com/show_page/id_z82fbceaa7cf111e3a705.html"],
// ["梁亮亮和谢小星的简单故事", "http://www.youku.com/show_page/id_z57a9f32e588311e18195.html"],
// ["舞出我人生3", "http://www.youku.com/show_page/id_zd578c048edda11de97c0.html"],
// ["银河护卫队", "http://www.youku.com/show_page/id_za9e5fe60ac9e11e299f6.html"],
// ["入侵华尔街", "http://www.youku.com/show_page/id_zde74db4441a311e2a19e.html"],
// ["热血高校3", "http://www.youku.com/show_page/id_z076ea982a00c11e2be40.html"],
// ["灰姑娘", "http://www.youku.com/show_page/id_zdf21bdac5bbd11e38b3f.html"],
// ["倩女幽魂2:人间道", "http://www.youku.com/show_page/id_zcc01f768962411de83b1.html"],
// ["精武门", "http://www.youku.com/show_page/id_zcc01a786962411de83b1.html"],
// ["倩女幽魂3:道道道", "http://www.youku.com/show_page/id_zcc01f7b8962411de83b1.html"],
// ["不能说的秘密", "http://www.youku.com/show_page/id_zcc0f87f2962411de83b1.html"],
// ["最遥远的距离", "http://www.youku.com/show_page/id_zcc0e2eac962411de83b1.html"],
// ["驯龙高手", "http://www.youku.com/show_page/id_z735edd38ccfc11de97c0.html"],
// ["浪客剑心", "http://www.youku.com/show_page/id_zf2ad82c61e5b11e1a046.html"],
// ["澳门风云2", "http://www.youku.com/show_page/id_z9bbfdee4db4d11e3b8b7.html"],
// ["勇者行动", "http://www.youku.com/show_page/id_ze593882cf55e11e0a046.html"],
// ["坏姐姐之拆婚联盟", "http://www.youku.com/show_page/id_z8bb6cee622b911e4a705.html"],
// ["移动迷宫", "http://www.youku.com/show_page/id_z6711d9e641d711e3b8b7.html"],
// ["明日边缘", "http://www.youku.com/show_page/id_z525c94e4bce811e0bf93.html"],
// ["飓风营救3", "http://www.youku.com/show_page/id_z3192c9128fbe11e3b8b7.html"],
// ["寄生兽", "http://www.youku.com/show_page/id_za602553a78dd11e3a705.html"],
// ["拉贝日记", "http://www.youku.com/show_page/id_zcc11111c962411de83b1.html"],
// ["环形使者", "http://www.youku.com/show_page/id_zabfe0a9ebcea11e0bf93.html"]
];

var getYoukuUrl = function(page, name, infoUrl, callback) {
  page.open(infoUrl, function(status){
    page.evaluate(function() {
      var node = document.querySelector('.btnShow.btnplayposi');
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
        getYoukuUrl,
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