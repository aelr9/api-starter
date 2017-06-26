var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Post', new Schema({ 
  title: String, 
  content: String,
  user: String,
  tags: [String],
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now}
}))