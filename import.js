var xlsx = require('node-xlsx');
var _ = require('lodash');
var mongoose = require('mongoose');
var async = require('async');
var Routine = require('./models/routine');

var obj = xlsx.parse(__dirname + '/data.xlsx');

var data = obj[0].data;

var header = data.shift(); 

//[ '发车地点', '目的地', , '发车时间', '价格', '备注' ]
//console.log(header);

// Connect the database
mongoose.connect('mongodb://localhost/dxnews');

async.map(data, function(r, cb) {
  var from = r[0]
    , to = r[2]
  
  var routine = new Routine({
    from: r[0],
    to: r[2],
    startTime: r[3],
    price: r[4],
    note: r[5]
  });
  routine.save(cb);

}, function(err, results) {
  if (err) throw err;
  console.log('done');
  process.exit(0);
});


