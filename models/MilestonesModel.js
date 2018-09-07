var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var milestonesSchema = new Schema({
  milestones : {
      //milestones : String,
      progress: Number
  }
});

module.exports = mongoose.model('MilestonesModel', milestonesSchema);