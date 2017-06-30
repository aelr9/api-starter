const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tag = mongoose.model('Tag', new Schema({ 
  tag: {type: String, unique: true, dropDups: true}
}))

module.exports = Tag;