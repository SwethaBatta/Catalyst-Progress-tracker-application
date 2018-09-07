//models/Activity.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseSchema = new Schema({
  description: String,
  month: String,
  year: Number,
  milestones: Number,
  activities : [{
    type: String
  }],
  checked : [{
    type: Number
  }],
  filename : String,
  fileUrl : String
});

module.exports = mongoose.model('Expense', expenseSchema);