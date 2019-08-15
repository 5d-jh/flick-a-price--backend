const mongoose = require('mongoose');

const UserModel = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hasNetflixAccount: Boolean,
  poolkey: String
});

exports.User = mongoose.model('user', new UserModel);