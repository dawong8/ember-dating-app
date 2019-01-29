const mongoose = require('mongoose');

const userSchema = mongoose.Schema();
userSchema.add({
  username: {type: String, unique: true},
  email: String,
  password: String,
  name: String,
  age: Number,
  gender: String,
  preferredDates: [ String ],
  picture: String,
  about: String,
  minAge: Number,
  maxAge: Number,
  preferredGender: String,
  likedUsers: [ userSchema ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
