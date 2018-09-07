//models/Activity.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imagesSchema = new Schema({
  image : String,
  url : String
});

module.exports = mongoose.model('Image', imagesSchema);