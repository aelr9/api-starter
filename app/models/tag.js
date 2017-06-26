const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tag = mongoose.model('Tag', new Schema({ 
  tag: {type: String, unique: true}
}))

module.exports = Tag;