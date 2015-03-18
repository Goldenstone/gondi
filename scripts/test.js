var _ = require('underscore');
var Download = require('download');
var phantom = require('phantom');
var async = require('async');
var fs = require('fs');

phantom.create(function(ph){
  ph.createPage(function(page){
    page.open("http://www.youku.com/show_page/id_zd3344b7afc5011e38b3f.html", function(status) {
      console.log(status);
      page.evaluate(function() {
        return document.querySelector('.btnShow.btnplayposi').href; 
      }, function(url) {
        console.log(url);
        page.close();
        ph.exit();
      });
    });
  });
});