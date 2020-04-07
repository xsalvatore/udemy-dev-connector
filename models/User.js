// modules importation
const mongoose = require('mongoose');

// creates the user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: 'String',
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// exports the user model under the name user
module.exports = User = mongoose.model('user', UserSchema);
