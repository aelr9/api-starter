const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = mongoose.model('Post', new Schema({ 
  title: String, 
  content: String,
  user: String,
  tags: [String],
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now}
}))

module.exports = Post;