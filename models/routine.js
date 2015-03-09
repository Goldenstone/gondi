var mongoose = require('mongoose');

var routineSchema = mongoose.Schema({
  from      : String,
  to        : String,
  price     : String,
  startTime : String,
  note      : String
});

module.exports = mongoose.model('Routine', routineSchema);
