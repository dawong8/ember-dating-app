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
  minAge: {type: Number, default: 0},
  maxAge: {type: Number, default: 9999},
  preferredGender: [String],
  likedUsers: [ userSchema ], 
  availableUsers: [ userSchema ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
