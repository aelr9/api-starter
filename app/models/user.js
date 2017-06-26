const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({ 
  name: {type: String, unique: true}, 
  password: String, 
  admin: Boolean,
  created: {type: Date, default: Date.now}
}))

module.exports = User;